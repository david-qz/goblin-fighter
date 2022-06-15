import state, {
    initialize,
    // import dispatch functions
} from '../state.js';

// make sure state is at known starting point
QUnit.module('state', { beforeEach: initialize });

const test = QUnit.test;

test('the first state test...', (expect) => {
    // what is the initial expected state?

    // use the action

    // what should the state be now?


    // remove this line when starting your test
    expect.deepEqual(state, {});
});
