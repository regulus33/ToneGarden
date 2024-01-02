function FunctionName() {
    const e = new Error('dummy');
    const stack = e.stack
        .split('\n')[2]
        .replace(/^\s+at\s+(.+?)\s.+/g, '$1' );
    return stack
}

export default FunctionName