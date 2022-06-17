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

    // Attack the goblin
    const damage = rollDice(3, 4);
    goblin.hp = Math.max(0, goblin.hp - damage);
    updateGoblin(goblin);
    addMessage(`You attacked ${goblin.name} for ${damage} points of damage.`);

    if (goblin.defeated) {
        // The player gets a heal when defeating a goblin
        character.goblinsDefeated++;
        const heal = rollDice(2, 2);
        character.hp += heal;
        addMessage(`You defeated ${goblin.name} and healed for ${heal} hp.`);

    } else {
        // If the goblin survived the player's attack, they get to strike back
        const damageTaken = rollDice(2, 3);
        character.hp = Math.max(0, character.hp - damageTaken);
        updateCharacter(character);
        addMessage(`${goblin.name} attacked you for ${damageTaken} points of damage.`);
    }

    if (character.defeated) {
        addMessage("You've been defeated. GAME OVER!");
    } else {
        // Spawn some goblins if the battlefield is empty or a dice roll succeeds
        if (!anyoneLeftStanding() || rollDice(1, 5) === 1) {
            const numToSpawn = rollDice(1, 2);
            for (let i = 0; i < numToSpawn; i++) {
                addAndAnnounceNewGoblin();
            }
        }
    }
}

function addAndAnnounceNewGoblin() {
    const goblin = addGoblin();
    if (goblin) {
        addMessage(`${goblin.name} arrives on the battlefield.`);
    }
}
