// import services and utilities
import { doCombatRound } from './game.js';

// import component creators
import createCharacter from './components/Character.js';
import createGoblinArmy from './components/GoblinArmy.js';
import createCombatLog from './components/CombatLog.js';
import createGoblinNamer from './components/GoblinNamer.js';

// import state and dispatch functions
import state, {
    addMessage,
    enqueueName,
} from './state.js';

// Create each component:
const Character = createCharacter(document.querySelector('.character'));
const GoblinArmy = createGoblinArmy(document.querySelector('.goblin-army'), {
    handleCombatRound(goblin) {
        doCombatRound(state.character, goblin);
        display();
    },
});
const CombatLog = createCombatLog(document.querySelector('.combat-log'));
const GoblinNamer = createGoblinNamer(document.querySelector('.goblin-namer'), {
    handleEnqueueName(name) {
        if (!state.character.defeated) {
            enqueueName(name);
            addMessage(`You hear ${name} approaching in the distance.`);
            display();
        }
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

// Show the page
document.querySelector('main').classList.remove('hidden');
