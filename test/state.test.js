import state, {
    initialize,
    addGoblin,
    updateGoblin,
    updateCharacter,
    addMessage,
    enqueueName,
    dequeueName,
    livingGoblins,
    GOBLIN_SLOTS,
} from '../state.js';

// make sure state is at known starting point
QUnit.module('state', { beforeEach: initialize });

const test = QUnit.test;

test('Initial state', (expect) => {
    expect.deepEqual(
        state.character,
        {
            hp: 10,
            goblinsDefeated: 0,
            defeated: false,
        },
        'Character is initially well-formed.'
    );

    expect.equal(livingGoblins(), 2, 'Two goblins are spawned.');
    for (const goblin of state.goblins) {
        if (!goblin) continue;
        expect.equal(typeof goblin.name, 'string', 'Goblin name is string.');
        expect.ok(goblin.hp > 0, 'Goblin is alive.');
    }

    expect.deepEqual(state.log, [], 'Log is empty.');
});

test('addGoblin()', expect => {
    addGoblin();
    addGoblin();

    expect.equal(livingGoblins(), 2 + 2, 'Can add two goblins to initial state');

    enqueueName('Bob');
    const bob = addGoblin();

    expect.equal(bob.name, 'Bob', 'Pulls names from name queue');

    for (let i = 0; i < 100; i++) {
        addGoblin();
    }

    expect.equal(livingGoblins(), GOBLIN_SLOTS, "Doesn't overfill battlefield");
});

test('updateGoblin()', expect => {
    // Find a goblin in the array and capture the index.
    // The array is sparse so this is annoying.
    let index;
    const goblin = state.goblins.find((g, i) => {
        if (g) {
            index = i;
            return true;
        }
    });

    goblin.hp = 5;
    updateGoblin(goblin);

    expect.equal(state.goblins[index].hp, 5);
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

test('name queue', expect => {
    expect.equal(dequeueName(), undefined, 'Empty queue gives undefined.');

    enqueueName('Foo');
    enqueueName('Bar');
    enqueueName('Baz');

    const names = [dequeueName(), dequeueName(), dequeueName()];

    expect.deepEqual(names, ['Foo', 'Bar', 'Baz'], 'Queue is FIFO');
});
