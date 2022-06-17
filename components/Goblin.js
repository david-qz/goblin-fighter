export default function createGoblin(goblin) {
    const div = document.createElement('div');

    // If no goblin, emit an empty div to take up the grid space
    if (goblin) {
        div.classList.add('goblin');
        if (goblin.defeated) {
            div.classList.add('defeated');
        }

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('name-tag');
        nameSpan.textContent = goblin.name;

        const img = document.createElement('img');
        img.src = goblin.defeated ? './assets/goblin-defeated.png' : './assets/goblin.png';

        const hpSpan = document.createElement('span');
        hpSpan.classList.add('hp');
        hpSpan.textContent = goblin.hp;

        div.append(nameSpan, img, hpSpan);
    }

    return div;
}
