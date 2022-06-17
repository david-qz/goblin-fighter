import { names } from './rng-tables.js';

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
    state.goblins = [
        getRandomGoblin(),
        getRandomGoblin(),
    ];
    state.log = [];
    state.nameQueue = [];
}
// call initialize
initialize();
// export state as primary (default) export
export default state;

// export dispatch functions that modify state
export function addGoblin(name) {
    const goblin = getRandomGoblin(name);
    if (name) goblin.name = name;
    state.goblins.push(goblin);
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

// helper functions
function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomGoblin() {
    return {
        hp: 10,
        name: getRandom(names),
        get defeated() {
            return this.hp <= 0;
        },
    };
}
