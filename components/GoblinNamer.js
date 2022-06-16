export default function createGoblinNamer(root, { handleAddGoblin }) {
    const form = root.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(form);
        handleAddGoblin(formData.get('name'));

        form.reset();
    });

    return () => {};
}
