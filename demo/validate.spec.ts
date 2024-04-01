import {test} from '../src'; // from 'hoare'
import {InvalidPhoneNumber, validatePhoneNumber} from './validate';

test('valid phone number', (assert) => {

    // given
    const phone = '+15551231234';

    // when
    let err;

    try {

        validatePhoneNumber(phone);

    } catch (e) {

        err = e;

    }

    assert.equal(err, undefined, 'should not throw');

});

test('invalid phone number', (assert) => {

    // given
    const phone = '123';

    // when
    let err;

    try {

        validatePhoneNumber(phone);

    } catch (e) {

        err = e;

    }

    assert.errorsEquivalent(err, new InvalidPhoneNumber(), 'should throw InvalidPhoneNumber');

});

