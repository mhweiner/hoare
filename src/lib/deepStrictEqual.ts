/* eslint-disable max-lines-per-function */
export function deepStrictEqual(obj1: any, obj2: any): boolean {

    if (obj1 === obj2) return true;

    if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
    if (typeof obj1 !== typeof obj2) return false;
    if (obj1 === null || obj2 === null) return false;

    // Handle Map objects
    if (obj1 instanceof Map && obj2 instanceof Map) {

        if (obj1.size !== obj2.size) return false;
        for (const [key, value] of obj1) {

            if (!obj2.has(key) || !deepStrictEqual(value, obj2.get(key))) return false;

        }
        return true;

    }

    // Handle Set objects
    if (obj1 instanceof Set && obj2 instanceof Set) {

        if (obj1.size !== obj2.size) return false;
        for (const item of obj1) {

            let matchFound = false;

            for (const item2 of obj2) {

                if (deepStrictEqual(item, item2)) {

                    matchFound = true;
                    break;

                }

            }
            if (!matchFound) return false;

        }
        return true;

    }

    // Handle object comparison
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {

        if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
        if (!deepStrictEqual(obj1[key], obj2[key])) return false;

    }

    return true;

}

// Helper function to check if a value is a primitive
function isPrimitive(value: any): boolean {

    return value !== Object(value);

}
