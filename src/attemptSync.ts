export default function attemptSync<T>(fn: () => T): [Error|undefined, T] {

    try {

        const result = fn();

        return [undefined, result];

    } catch (e) {

        return [e as Error, {} as T];

    }

}
