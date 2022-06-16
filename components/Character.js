export default function createCharacter(root) {
    const img = root.querySelector('img');
    const [hpDisplay, scoreDisplay] = root.querySelectorAll('span');

    return ({ character }) => {
        hpDisplay.textContent = character.hp;
        scoreDisplay.textContent = character.goblinsDefeated;

        img.src = character.defeated ? './assets/hero-defeated.png' : './assets/hero.png';
    };
}
