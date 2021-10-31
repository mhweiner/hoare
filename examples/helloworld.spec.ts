import {suite, isolate} from '../src';
import * as helloWorldModule from './helloworld';

const s = suite('greet()');

s.test('with no mocking', (assert) => {

    // when
    const res = helloWorldModule.greet();

    // then
    assert.plan(1);
    assert.deepEqual(res, 'hello world', 'should return "hello world"');

});

s.test('with hello(): "greetings", world(): "earthling"', (assert) => {

    // given
    const sut: typeof helloWorldModule = isolate('./helloworld', {
        props: [
            ['hello', () => 'greetings'],
            ['world', () => 'earthling'],
        ],
    });

    // when
    const res = sut.greet();

    // then
    assert.plan(1);
    assert.deepEqual(res, 'greetings earthling', 'should return "greetings earthling"');

});
