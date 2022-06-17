import { names } from './rng-tables.js';
import { getRandomItem, rollDice } from './utils.js';

export const GOBLIN_SLOTS = 8;
const indices = '01234567';

// set state to an empty object
const state = {};

// initialize state, also used in test
export function initialize() {
    state.character = {
        hp: 10,
        goblinsDefeated: 0,
        get defeated() {
            return this.hp <= 0;
        },
    };
    state.goblins = [];
    state.log = [];
    state.nameQueue = [];

    // Add two goblins initially
    addGoblin();
    addGoblin();
}
// call initialize
initialize();
// export state as primary (default) export
export default state;

// export dispatch functions that modify state
export function addGoblin() {
    const openIndices = [...indices].filter(i => {
        const goblin = state.goblins[i];
        return !goblin || goblin.defeated;
    });

    const pickedIndex = getRandomItem(openIndices);

    if (pickedIndex) {
        const newGoblin = getRandomGoblin();
        state.goblins[pickedIndex] = newGoblin;
        return newGoblin;
    }
    return null;
}

export function anyoneLeftStanding() {
    return livingGoblins() !== 0;
}

export function livingGoblins() {
    let count = 0;
    for (const goblin of state.goblins) {
        if (goblin && !goblin.defeated) count++;
    }
    return count;
}

// This function is a no-op but I'm keeping it here to mimic the
// demo. I guess if there was a backend in this app we'd have
// something real to do here.
export function updateGoblin(goblin) {
    const index = state.goblins.indexOf(goblin);
    if (index !== -1) {
        state.goblins[index] = goblin;
    }
}

// See above comment for why this exists.
export function updateCharacter(character) {
    state.character = character;
}

export function addMessage(message) {
    state.log.push(message);
}

export function enqueueName(name) {
    state.nameQueue.splice(0, 0, name);
}

export function dequeueName() {
    return state.nameQueue.pop();
}

// Helpers
function getRandomGoblin() {
    const bonusHealth = Math.floor(state.character.goblinsDefeated / 10);

    return {
        hp: 5 + rollDice(1, 5) + bonusHealth,
        name: dequeueName() || getRandomItem(names),
        get defeated() {
            return this.hp <= 0;
        },
    };
}
