function checkPresent(val:any) {
    return (typeof val !== 'undefined') && (val !== null) && val !== '';
}

export { checkPresent }
