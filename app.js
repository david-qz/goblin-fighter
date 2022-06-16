// import services and utilities

// import component creators
import createCharacter from './components/Character.js';

// import state and dispatch functions
import state from './state.js';

// Create each component:
const Character = createCharacter(document.querySelector('.character'));

// Roll-up display function that renders (calls with state) each component
function display() {
    Character({ character: state.character });
}

// Call display on page load
display();
