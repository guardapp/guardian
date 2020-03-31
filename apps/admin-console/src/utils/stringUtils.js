export function capitalize(word) {
    let newWord = '';
    for(let i = 0; i < word.length; i++) {
        if (i === 0) {
            newWord = newWord.concat(word[i].toUpperCase());
        } else {
            newWord = newWord.concat(word[i]);
        }
    }
    return newWord;
}