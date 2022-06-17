export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function rollDice(rolls, die) {
    let total = 0;
    for (let i = 0; i < rolls; i++) {
        total += Math.ceil(Math.random() * die);
    }
    return total;
}
