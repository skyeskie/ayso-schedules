// tslint:disable:no-console

enum Level {
    ALL = 0,
    TRACE, DEBUG, INFO, WARN, ERROR, FATAL,
    NONE,
}

class Logger {
    static GLOBAL_LEVEL: Level = Level.INFO;
    static Level: any = Level;

    private static loggers: Map<string, Logger> = new Map<string, Logger>();

    private readonly name: string;
    private level: Level = null;

    constructor(n: string, l?: Level) {
        this.name = n;
        this.level = l || null;
    }

    public static get(name: string, level?: Level): Logger {
        if (!Logger.loggers.has(name)) {
            Logger.loggers.set(name, new Logger(name));
        }

        const logger: Logger = Logger.loggers.get(name);

        if (level !== null && typeof level !== 'undefined') {
            logger.setLevel(level);
        }

        return logger;
    }

    setLevel(newLevel: Level): void {
        this.level = newLevel;
    }

    clearLevel(): void {
        this.level = null;
    }

    isEnabled(level: Level): boolean {
        return (this.level !== null) ?
            (level >= this.level) :
            (level >= Logger.GLOBAL_LEVEL);
    }

    fatal(...messages: any[]): void {
        if (this.isEnabled(Level.FATAL)) {
            console.error(this.name, '[FATAL]', ...messages);
        }
    }

    error(...messages: any[]): void {
        if (this.isEnabled(Level.ERROR)) {
            console.error(this.name, '[ERROR]', ...messages);
        }
    }

    warn(...messages: any[]): void {
        if (this.isEnabled(Level.WARN)) {
            console.warn(this.name, '[WARN]', ...messages);
        }
    }

    log(...messages: any[]): void {
        this.info(messages);
    }

    info(...messages: any[]): void {
        if (this.isEnabled(Level.INFO)) {
            console.info(this.name, '[INFO]', ...messages);
        }
    }

    debug(...messages: any[]): void {
        if (this.isEnabled(Level.DEBUG)) {
            console.debug(this.name, '[DEBUG]', ...messages);
        }
    }

    trace(...messages: any[]): void {
        if (this.isEnabled(Level.TRACE)) {
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

function ClassLogger(level?: Level): (target: any, property: string) => void {
    return (target: any, property: string) => {
        const loggerName = target.constructor.toString().match(/\w+/g)[1];
        const logger = Logger.get(loggerName, level);

        target[property] = logger;

        Object.keys(target)
              .filter(key => typeof target[key] === 'function')
              .forEach(key => {
                  const method = key + '()';
                  const descriptor = Object.getOwnPropertyDescriptor(target, key);
                  const originalMethod = descriptor.value;

                  // tslint:disable-next-line:typedef
                  descriptor.value = function() {
                      const result = originalMethod.apply(this, arguments);
                      if (result !== null && typeof result === 'object'
                          && result.hasOwnProperty('_id') && typeof result.then === 'function') {

                          logger.debug(method, arguments, '=> emit Promise #', result._id);
                          result.then(val => logger.debug('Promise (', method, result._id, ') => ', val));
                      } else {
                          logger.debug(method, arguments, '=>', result);
                      }
                      return result;
                  };

                  Object.defineProperty(target, key, descriptor);
              });
    };
}

export { ClassLogger as default, ClassLogger, Logger, Level };
