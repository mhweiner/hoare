import * as sinon from 'sinon';

export function stub() {

    return sinon.stub();

}

export function stubWithData(inputs: any[], outputs: any[]): sinon.SinonStub<any, any> {

    const sinonStub = sinon.stub();

    inputs.forEach((input, index) => {

        sinonStub.withArgs(input).returns(outputs[index]);

    });

    return sinonStub;

}
