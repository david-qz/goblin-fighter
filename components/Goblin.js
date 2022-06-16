export default function createGoblin(goblin) {
    const div = document.createElement('div');
    div.classList.add('goblin');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('name-tag');
    nameSpan.textContent = goblin.name;

    const img = document.createElement('img');
    img.src = './assets/goblin.png';

    const hpSpan = document.createElement('span');
    hpSpan.classList.add('hp');
    hpSpan.textContent = goblin.hp;

    div.append(nameSpan, img, hpSpan);
    return div;
}
