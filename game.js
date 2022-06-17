import { rollDice } from './utils.js';
import {
    updateGoblin,
    addMessage,
    anyoneLeftStanding,
    addGoblin,
    updateCharacter,
} from './state.js';

export function doCombatRound(character, goblin) {
    if (goblin.defeated || character.defeated) return;

    const damage = rollDice(3, 4);
    goblin.hp = Math.max(0, goblin.hp - damage);
    updateGoblin(goblin);
    addMessage(`You attacked ${goblin.name} for ${damage} points of damage.`);

    if (goblin.defeated) {
        character.goblinsDefeated++;
        const heal = rollDice(2, 2);
        character.hp += heal;
        addMessage(`You defeated ${goblin.name} and healed for ${heal} hp.`);
        if (!anyoneLeftStanding()) {
            const goblin = addGoblin();
            if (goblin) {
                addMessage(`${goblin.name} arrives on the battlefield.`);
            }
        }
        return;
    }

    const damageTaken = rollDice(2, 3);
    character.hp = Math.max(0, character.hp - damageTaken);
    updateCharacter(character);
    addMessage(`${goblin.name} attacked you for ${damageTaken} points of damage.`);

    if (character.defeated) {
        addMessage('You been defeated. GAME OVER!');
        return;
    }

    if (rollDice(1, 4) === 1) {
        const goblin = addGoblin();
        if (goblin) {
            addMessage(`${goblin.name} arrives on the battlefield.`);
        }
    }
}
