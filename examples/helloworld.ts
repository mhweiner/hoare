import * as self from './helloworld';

export function hello() {

    return 'hello';

}

export function world() {

    return 'world';

}

export function greet() {

    return `${self.hello()} ${self.world()}`;

}
