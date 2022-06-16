// import services and utilities

// import component creators
import createCharacter from './components/Character.js';
import createGoblinArmy from './components/GoblinArmy.js';

// import state and dispatch functions
import state, { updateGoblin } from './state.js';

// Create each component:
const Character = createCharacter(document.querySelector('.character'));
const GoblinArmy = createGoblinArmy(document.querySelector('.goblin-army'), {
    handleCombatRound(goblin) {
        // TODO: Implement actual game logic
        goblin.hp--;
        updateGoblin(goblin);
        display();
    },
});

// Roll-up display function that renders (calls with state) each component
function display() {
    Character({ character: state.character });
    GoblinArmy({ goblins: state.goblins });
}

// Call display on page load
display();
