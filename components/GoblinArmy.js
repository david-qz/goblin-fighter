import createGoblin from './Goblin.js';

export default function createGoblinArmy(root, { handleCombatRound }) {

    return ({ goblins }) => {
        root.innerHTML = '';

        for (const goblin of goblins) {
            const goblinDiv = createGoblin(goblin);

            goblinDiv.addEventListener('click', () => {
                handleCombatRound(goblin);
            });

            root.append(goblinDiv);
        }
    };
}
