const CamelToSnake = (str: string) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
export  default CamelToSnake
