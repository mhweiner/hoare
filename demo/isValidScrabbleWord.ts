import {readFileSync} from 'fs';

export function isValidScrabbleWord(word: string) {

    const validWords = getValidWords();

    return validWords.indexOf(word) !== -1;

}

function getValidWords() {

    try {

        const dictContents = readFileSync('./dict.txt', {encoding: 'utf8', flag: 'r'});

        return dictContents.split('\n');

    } catch (e) {

        throw new Error('cannot read file ./dict.txt');

    }

}
