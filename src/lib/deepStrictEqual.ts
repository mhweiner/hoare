export function deepStrictEqual(obj1: any, obj2: any) {

    if (obj1 === obj2) return true;
    if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
    if (typeof obj1 !== typeof obj2) return false; // will not work for null due to JS bug (https://alexanderell.is/posts/typeof-null/)
    if (obj1 === null || obj2 === null) return false; // if both ARE null, we already returned true
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    // compare objects with same number of keys
    for (const key in obj1) {

        if (!(key in obj2)) return false; // other object doesn't have this prop
        if (!deepStrictEqual(obj1[key], obj2[key])) return false;

    }

    return true;

}

// check if value is primitive
function isPrimitive(obj: any) {

    return (obj !== Object(obj));

}
