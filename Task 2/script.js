function addName() {
    const input = document.getElementById('name');
    const name = input.value.trim();

    if(!name) {return;}

    document.getElementById('header').textContent = `Hello, ${name}!`;

    const li = document.createElement('li');
    li.textContent = name;
    document.getElementById('list').append(li);

    input.value = '';
}

function removeName(event) {
    if (event.target.nodeName == 'LI') {
        const name = event.target.textContent;
        document.getElementById('header').textContent = `Goodbye, ${name}!`;
        event.target.remove();
        }
}

document.getElementById('greet').addEventListener('click', addName);
document.getElementById('list').addEventListener('click', removeName);