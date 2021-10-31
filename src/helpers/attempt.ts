export default async function attempt<T>(p: Promise<T>): Promise<[Error|undefined, T]> {

    try {

        const result = await p;

        return [undefined, result];

    } catch (e) {

        return [e as Error, {} as T];

    }

}
