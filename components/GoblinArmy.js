import { GOBLIN_SLOTS } from '../state.js';
import createGoblin from './Goblin.js';

export default function createGoblinArmy(root, { handleCombatRound }) {

    return ({ goblins }) => {
        root.innerHTML = '';

        for (let i = 0; i < GOBLIN_SLOTS; i++) {
            const goblin = goblins[i];
            const goblinDiv = createGoblin(goblin);

            goblinDiv.addEventListener('click', () => {
                handleCombatRound(goblin);
            });

            root.append(goblinDiv);
        }
    };
}
