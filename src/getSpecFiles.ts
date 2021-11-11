import fg from 'fast-glob';

export function getSpecFiles() {

    const glob = process.argv[2];

    return fg.sync([glob]); // array of all of the spec files to run

}


