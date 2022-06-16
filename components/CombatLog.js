export default function createCombatLog(root) {
    const ul = root.querySelector('ul');

    return ({ log }) => {
        const latest = log.slice(-5);

        ul.innerHTML = '';

        for (const message of latest) {
            const li = document.createElement('li');
            li.textContent = message;
            ul.append(li);
        }
    };
}
