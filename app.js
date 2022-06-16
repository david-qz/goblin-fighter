// import services and utilities

// import component creators
import createCharacter from './components/Character.js';
import createGoblinArmy from './components/GoblinArmy.js';
import createCombatLog from './components/CombatLog.js';

// import state and dispatch functions
import state, { updateGoblin, updateCharacter, addMessage } from './state.js';

// Create each component:
const Character = createCharacter(document.querySelector('.character'));
const GoblinArmy = createGoblinArmy(document.querySelector('.goblin-army'), {
    handleCombatRound(goblin) {
        // TODO: Implement actual game logic
        const damage = Math.ceil(Math.random() * 3);
        const damageTaken = Math.ceil(Math.random() * 2);

        goblin.hp -= damage;
        state.character.hp -= damageTaken;
        updateGoblin(goblin);
        updateCharacter(state.character);

        addMessage(`You attacked ${goblin.name} for ${damage} points of damage.`);
        addMessage(`${goblin.name} attacked you for ${damageTaken} points of damage.`);
        display();
    },
});
const CombatLog = createCombatLog(document.querySelector('.combat-log'));

// Roll-up display function that renders (calls with state) each component
function display() {
    Character({ character: state.character });
    GoblinArmy({ goblins: state.goblins });
    CombatLog({ log: state.log });
}

// Call display on page load
display();
