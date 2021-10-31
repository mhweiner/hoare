import sinon, {SinonStub} from 'sinon';

export function stub() {

    return sinon.stub();

}

export function stubWithData(inputs: any[], outputs: any[]): SinonStub<any, any> {

    const sinonStub = sinon.stub();

    inputs.forEach((input, index) => {

        sinonStub.withArgs(input).returns(outputs[index]);

    });

    return sinonStub;

}
