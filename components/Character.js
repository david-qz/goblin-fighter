export default function createCharacter(root) {
    const [hpDisplay, scoreDisplay] = root.querySelectorAll('span');

    return ({ character }) => {
        hpDisplay.textContent = character.hp;
        scoreDisplay.textContent = character.goblinsDefeated;
    };
}
