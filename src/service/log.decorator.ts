enum Level {
    ALL = 0,
    TRACE, DEBUG, INFO, WARN, ERROR, FATAL,
    NONE,
}

class Logger {
    static GLOBAL_LEVEL:Level = Level.INFO;
    static Level:any = Level;

    private name:string;
    private level:Level = null;

    constructor(n:string, l?:Level) {
        this.name = n;
        this.level = l || null;
    }

    setLevel(newLevel: Level) {
        this.level = newLevel;
    }

    clearLevel() {
        this.level = null;
    }

    isEnabled(level:Level) {
        return (this.level !== null) ?
            (level >= this.level) :
            (level >= Logger.GLOBAL_LEVEL);
    }

    fatal(...messages:Object[]) {
        if(this.isEnabled(Level.FATAL)) {
            console.error(this.name, '[FATAL]', ...messages);
        }
    }

    error(...messages:Object[]) {
        if(this.isEnabled(Level.ERROR)) {
            console.error(this.name, '[ERROR]', ...messages);
        }
    }

    warn(...messages:Object[]) {
        if(this.isEnabled(Level.WARN)) {
            console.warn(this.name, '[WARN]', ...messages);
        }
    }

    log(...messages:Object[]) {
        this.info(messages);
    }

    info(...messages:Object[]) {
        if(this.isEnabled(Level.INFO)) {
            console.info(this.name, '[INFO]', ...messages);
        }
    }

    debug(...messages:Object[]) {
        if(this.isEnabled(Level.DEBUG)) {
            console.debug(this.name, '[DEBUG]', ...messages);
        }
    }

    trace(...messages:Object[]) {
        if(this.isEnabled(Level.TRACE)) {
            console.debug(this.name, '[TRACE]', ...messages);
        }
    }
}

/**
 * PropertyDirective for creating a class logger
 * - Class is used as logger category
 * - Automatically puts all function arguments and results to TRACE
 *
 * Usage - use this on a property of type Logger
 * Example:
 * <code>
 * class Foo {
 *     @ClassLogger log: Logger;
 * }
 * </code>
 */

function ClassLogger(target: Object, property: string): void {
    let loggerName = target.constructor.toString().match(/\w+/g)[1];
    let logger = new Logger(loggerName);

    target[property] = logger;

    Object.keys(target)
          .filter(key => typeof target[key] === 'function')
          .forEach(key => {
              let method = key + '()';
              let descriptor = Object.getOwnPropertyDescriptor(target, key);
              let originalMethod = descriptor.value;

              descriptor.value = function() {
                  var result = originalMethod.apply(this, arguments);
                  if(typeof result === 'object' && result.hasOwnProperty('_id') &&
                          typeof result.then === 'function') {
console.log('Applying log to {',loggerName,'->',key,'}');
                      logger.debug(method, arguments, '=> emit Promise #', result._id);
                      result.then(val => logger.debug('Promise (', method, result._id, ') => ', val));
                  } else {
                      logger.debug(method, arguments, '=>', result);
                  }
                  return result;
              };

              Object.defineProperty(target, key, descriptor);
          });
}

export {ClassLogger as default, ClassLogger, Logger, Level}
