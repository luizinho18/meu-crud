const apiUrl = 'https://script.google.com/macros/s/AKfycbwgJTcKSFo_QhAVimjYxkS5qGnPejsbqo_i3uDzbHUT7gioxD0-pkyEi6-5Mzkfg048/exec';

/ Função para criar dados (produto)
function createData() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const validity = document.getElementById("validity").value;
    const imageUrl = document.getElementById("imageUrl").value;

    // Envia os dados para o Google Apps Script
    fetch(`${apiUrl}?action=create&name=${name}&description=${description}&validity=${validity}&imageUrl=${imageUrl}`, {
        method: 'POST',
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Erro ao cadastrar produto:", error));
}

// Função para ler dados
function readData() {
    fetch(`${apiUrl}?action=read`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayData(data);  // Exibe os dados na página
        })
        .catch(error => console.error("Erro ao ler dados:", error));
}

// Função para exibir os dados na página
function displayData(data) {
    const dataDisplay = document.getElementById("data-display");
    dataDisplay.innerHTML = '';  // Limpa os dados existentes

    if (data.length === 0) {
        dataDisplay.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    data.forEach(row => {
        const name = row[0];
        const description = row[1];
        const validity = row[2];
        const imageUrl = row[3];

        // Cria uma linha para exibir os dados
        const rowElement = document.createElement("div");
        rowElement.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Descrição:</strong> ${description}</p>
            <p><strong>Validade:</strong> ${validity}</p>
            <img src="${imageUrl}" alt="${name}" style="width: 100px; height: auto;">
            <button onclick="updateData(${name})">Atualizar</button>
            <button onclick="deleteData(${name})">Deletar</button>
        `;
        dataDisplay.appendChild(rowElement);
    });
}
