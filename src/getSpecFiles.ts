import glob from 'tiny-glob';

export async function getSpecFiles() {

    return glob(process.argv[2]);

}
