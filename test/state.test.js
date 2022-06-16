import state, {
    initialize,
    addGoblin,
    updateGoblin,
    updateCharacter,
    addMessage,
} from '../state.js';

// make sure state is at known starting point
QUnit.module('state', { beforeEach: initialize });

const test = QUnit.test;

test('Initial state', (expect) => {
    expect.deepEqual(state.character, {
        hp: 10,
        goblinsDefeated: 0,
    });

    expect.equal(state.goblins.length, 2);
    for (const goblin of state.goblins) {
        expect.equal(typeof goblin.name, 'string');
        expect.equal(goblin.hp, 10);
    }

    expect.deepEqual(state.log, []);
});

test('addGoblin()', expect => {
    addGoblin('Boss');
    const lastGoblin = state.goblins[state.goblins.length - 1];

    expect.equal(lastGoblin.name, 'Boss');
});

test('updateGoblin()', expect => {
    const goblin = state.goblins[0];
    goblin.hp = 5;
    updateGoblin(goblin);

    expect.equal(state.goblins[0].hp, 5);
});

test('updateCharacter()', expect => {
    const character = state.character;
    character.hp = 3;
    updateCharacter(character);

    expect.equal(state.character.hp, 3);
});

test('addMessage()', expect => {
    addMessage('You attacked Jerry for 4 points of damage.');
    addMessage('Jerry attacked you for 10 points of damage.');
    addMessage('You died.');

    expect.deepEqual(state.log, [
        'You attacked Jerry for 4 points of damage.',
        'Jerry attacked you for 10 points of damage.',
        'You died.',
    ]);
});
