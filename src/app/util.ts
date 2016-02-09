function checkPresent(val) {
    return (typeof val !== 'undefined') && (val !== null) && val !== '';
}

export { checkPresent }
