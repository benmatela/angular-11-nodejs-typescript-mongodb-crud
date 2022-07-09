const randomGenerator = (length: number, charset: string) => {
    const result = [];
    for(let i = 0; i < length; i++) {
      result.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    return result.join('');
}

export default { randomGenerator };