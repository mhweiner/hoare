export async function chill(msec: number) {

    if (msec < 0) throw new Error('msec must be positive');

    return new Promise((resolve) => {

        setTimeout(() => resolve('ready'), msec);

    });

}
