export default function createGoblinNamer(root, { handleEnqueueName }) {
    const form = root.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(form);
        handleEnqueueName(formData.get('name'));

        form.reset();
    });

    return () => {};
}
