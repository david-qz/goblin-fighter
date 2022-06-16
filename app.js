// import services and utilities

// import component creators
import createCharacter from './components/Character.js';
import createGoblinArmy from './components/GoblinArmy.js';
import createCombatLog from './components/CombatLog.js';
import createGoblinNamer from './components/GoblinNamer.js';

// import state and dispatch functions
import state, { addGoblin, updateGoblin, updateCharacter, addMessage } from './state.js';

// Create each component:
const Character = createCharacter(document.querySelector('.character'));
const GoblinArmy = createGoblinArmy(document.querySelector('.goblin-army'), {
    handleCombatRound(goblin) {
        const character = state.character;
        if (goblin.defeated || character.defeated) return;

        const damage = rollDice(3, 4);
        goblin.hp = Math.max(0, goblin.hp - damage);
        addMessage(`You attacked ${goblin.name} for ${damage} points of damage.`);

        const damageTaken = rollDice(2, 2);
        character.hp = Math.max(0, character.hp - damageTaken);
        addMessage(`${goblin.name} attacked you for ${damageTaken} points of damage.`);

        if (goblin.defeated) {
            character.goblinsDefeated++;
            const heal = rollDice(2, 2);
            character.hp += heal;
            addMessage(`You defeated ${goblin.name} and healed for ${heal} hp.`);
        }

        if (character.defeated) {
            addMessage('You been defeated. GAME OVER!');
        }

        updateGoblin(goblin);
        updateCharacter(character);

        display();
    },
});
const CombatLog = createCombatLog(document.querySelector('.combat-log'));
const GoblinNamer = createGoblinNamer(document.querySelector('.goblin-namer'), {
    handleAddGoblin(name) {
        addGoblin(name);
        display();
    }
});

// Roll-up display function that renders (calls with state) each component
function display() {
    Character({ character: state.character });
    GoblinArmy({ goblins: state.goblins });
    CombatLog({ log: state.log });
    GoblinNamer({});
}

// Call display on page load
display();

// Game Logic Helpers

// return a dice roll
function rollDice(rolls, die) {
    let total = 0;
    for (let i = 0; i < rolls; i++) {
        total += Math.ceil(Math.random() * die);
    }
    return total;
}
