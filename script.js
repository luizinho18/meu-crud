const apiUrl = 'https://script.google.com/macros/s/AKfycbwgJTcKSFo_QhAVimjYxkS5qGnPejsbqo_i3uDzbHUT7gioxD0-pkyEi6-5Mzkfg048/exec';

// Função para criar dados
function createData() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    fetch(`${apiUrl}?action=create&name=${name}&description=${description}`, {
        method: 'POST',
    }).then(response => response.json())
      .then(data => console.log(data));
}

// Função para ler dados
function readData() {
    fetch(`${apiUrl}?action=read`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Lógica para exibir os dados na interface
        });
}

// Função para atualizar dados
function updateData(id, name, description) {
    fetch(`${apiUrl}?action=update&id=${id}&name=${name}&description=${description}`, {
        method: 'POST',
    }).then(response => response.json())
      .then(data => console.log(data));
}

// Função para deletar dados
function deleteData(id) {
    fetch(`${apiUrl}?action=delete&id=${id}`, {
        method: 'POST',
    }).then(response => response.json())
      .then(data => console.log(data));
}
