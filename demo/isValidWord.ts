import {promises} from 'fs';

export async function isValidWord(word: string) {

    const validWords = await getValidWords();

    return validWords.indexOf(word) !== -1;

}

async function getValidWords() {

    const contents = await promises.readFile('./dict.txt', 'utf-8');

    return contents.split('\n');

}
