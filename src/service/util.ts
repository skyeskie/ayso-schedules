function checkPresent(val: any): boolean {
    return (typeof val !== 'undefined') && (val !== null) && val !== '';
}

export { checkPresent };
