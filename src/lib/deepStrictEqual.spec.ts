import {test} from '../test';
import {deepStrictEqual} from './deepStrictEqual';

test('deepStrictEqual() returns true for primitives that are strictly equal', (assert) => {

    assert.equal(deepStrictEqual(1, 1), true);
    assert.equal(deepStrictEqual('a', 'a'), true);
    assert.equal(deepStrictEqual(true, true), true);
    assert.equal(deepStrictEqual(null, null), true);
    assert.equal(deepStrictEqual(undefined, undefined), true);

});

test('deepStrictEqual() returns false for primitives that are not strictly equal', (assert) => {

    assert.equal(deepStrictEqual(1, 2), false);
    assert.equal(deepStrictEqual('a', 'b'), false);
    assert.equal(deepStrictEqual(true, false), false);
    assert.equal(deepStrictEqual(null, undefined), false);

});

test('deepStrictEqual() returns false if one is a non-object and the other is an object', (assert) => {

    assert.equal(deepStrictEqual(undefined, {a: {b: '2'}}), false);
    assert.equal(deepStrictEqual({a: {b: '2'}}, undefined), false);
    assert.equal(deepStrictEqual(1, {a: {b: '2'}}), false);
    assert.equal(deepStrictEqual({a: {b: '2'}}, 1), false);

});

test('deepStrictEqual() returns false if one is null (null is an object due to JS bug)', (assert) => {

    assert.equal(deepStrictEqual(null, {a: {b: '2'}}), false);
    assert.equal(deepStrictEqual({a: {b: '2'}}, null), false);
    assert.equal(deepStrictEqual(null, true), false);
    assert.equal(deepStrictEqual(true, null), false);
    assert.equal(deepStrictEqual(null, 'a'), false);
    assert.equal(deepStrictEqual('a', null), false);

});

test('deepStrictEqual() returns true for objects that are deeply equal', (assert) => {

    assert.equal(deepStrictEqual({a: 1, b: 2}, {a: 1, b: 2}), true);
    assert.equal(deepStrictEqual({a: {b: 2}}, {a: {b: 2}}), true);
    assert.equal(deepStrictEqual({a: {b: {c: 3}}}, {a: {b: {c: 3}}}), true);

});

test('deepStrictEqual() returns false for objects that are not deeply equal', (assert) => {

    assert.equal(deepStrictEqual({a: 1, b: 2}, {a: 1, b: 3}), false);
    assert.equal(deepStrictEqual({a: {b: 2}}, {a: {b: 3}}), false);
    assert.equal(deepStrictEqual({a: {b: {c: 3}}}, {a: {b: {c: 4}}}), false);

});

test('deepStrictEqual() returns false for objects that have different numbers of keys', (assert) => {

    assert.equal(deepStrictEqual({a: 1, b: 2}, {a: 1}), false);
    assert.equal(deepStrictEqual({a: 1}, {a: 1, b: 2}), false);

});

test('deepStrictEqual() returns false for objects with different keys', (assert) => {

    assert.equal(deepStrictEqual({a: 1, b: 2}, {a: 1, c: 3}), false);

});

test('deepStrictEqual() returns false for objects with different values', (assert) => {

    assert.equal(deepStrictEqual({a: 1, b: 2}, {a: 1, b: 3}), false);

});

test('deepStrictEqual() returns false for objects with different types', (assert) => {

    assert.equal(deepStrictEqual({a: 1, b: 2}, {a: 1, b: '2'}), false);

});

test('deepStrictEqual() returns false for objects with different nested values', (assert) => {

    assert.equal(deepStrictEqual({a: {b: 2}}, {a: {b: 3}}), false);

});

test('deepStrictEqual() returns false for objects with different nested types', (assert) => {

    assert.equal(deepStrictEqual({a: {b: 2}}, {a: {b: '2'}}), false);

});

test('deepStrictEqual() returns false for objects with different nested numbers of keys', (assert) => {

    assert.equal(deepStrictEqual({a: {b: 2}}, {a: {b: 2, c: 3}}), false);
    assert.equal(deepStrictEqual({a: {b: 2, c: 3}}, {a: {b: 2}}), false);

});

test('deepStrictEqual() returns false for objects with different nested keys', (assert) => {

    assert.equal(deepStrictEqual({a: {b: 2}}, {a: {c: 3}}), false);

});

// write a test for deepStrictEqual() that supports Map and Set

test('deepStrictEqual() returns true for Map objects that are deeply equal', (assert) => {

    const map1 = new Map([[1, 'a'], [2, 'b']]);
    const map2 = new Map([[1, 'a'], [2, 'b']]);

    assert.equal(deepStrictEqual(map1, map2), true);

});

test('deepStrictEqual() returns false for Map objects that are not deeply equal', (assert) => {

    const map1 = new Map([[1, 'a'], [2, 'b']]);
    const map2 = new Map([[1, 'a'], [2, 'c']]);

    assert.equal(deepStrictEqual(map1, map2), false);

});

test('deepStrictEqual() returns false for Map objects with different numbers of keys', (assert) => {

    const map1 = new Map([[1, 'a'], [2, 'b']]);
    const map2 = new Map([[1, 'a']]);

    assert.equal(deepStrictEqual(map1, map2), false);

});

test('deepStrictEqual() returns false for Map objects with different keys', (assert) => {

    const map1 = new Map([[1, 'a'], [2, 'b']]);
    const map2 = new Map([[1, 'a'], [3, 'b']]);

    assert.equal(deepStrictEqual(map1, map2), false);

});

test('deepStrictEqual() returns false for Map objects with different values', (assert) => {

    const map1 = new Map([[1, 'a'], [2, 'b']]);
    const map2 = new Map([[1, 'a'], [2, 'c']]);

    assert.equal(deepStrictEqual(map1, map2), false);

});

test('deepStrictEqual() returns true for Set objects that are deeply equal', (assert) => {

    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['a', 'b']);

    assert.equal(deepStrictEqual(set1, set2), true);

});

test('deepStrictEqual() returns false for Set objects that are not deeply equal', (assert) => {

    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['a', 'c']);

    assert.equal(deepStrictEqual(set1, set2), false);

});

test('deepStrictEqual() returns false for Set objects with different numbers of keys', (assert) => {

    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['a']);

    assert.equal(deepStrictEqual(set1, set2), false);

});

test('deepStrictEqual() returns false for Set objects with different values', (assert) => {

    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['a', 'c']);

    assert.equal(deepStrictEqual(set1, set2), false);

});

test('deepStrictEqual() returns false for Set objects with different types', (assert) => {

    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['a', 2]);

    assert.equal(deepStrictEqual(set1, set2), false);

});

test('deepStrictEqual() returns false for Set objects with different nested values', (assert) => {

    const set1 = new Set([new Set(['a', 'b'])]);
    const set2 = new Set([new Set(['a', 'c'])]);

    assert.equal(deepStrictEqual(set1, set2), false);

});

test('deepStrictEqual() returns false when comparing array to object with same numeric keys', (assert) => {

    const obj = {0: 1, 1: 2, 2: 3};
    const arr = [1, 2, 3];

    assert.equal(deepStrictEqual(obj, arr), false);

});
