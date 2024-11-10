const apiUrl = 'https://script.google.com/macros/s/AKfycbwgJTcKSFo_QhAVimjYxkS5qGnPejsbqo_i3uDzbHUT7gioxD0-pkyEi6-5Mzkfg048/exec';

// Função para criar dados (produto)
function createData() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const validity = document.getElementById("validity").value;
    const imageUrl = document.getElementById("imageUrl").value;

    fetch(`${apiUrl}?action=create&name=${name}&description=${description}&validity=${validity}&imageUrl=${imageUrl}`, {
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
            displayData(data);  // Exibe os dados na página
        });
}

// Função para exibir os dados na página
function displayData(data) {
    const dataDisplay = document.getElementById("data-display");
    dataDisplay.innerHTML = '';  // Limpa os dados existentes

    data.forEach(row => {
        const id = row[0];  // Assume que o ID está na primeira coluna
        const name = row[1];
        const description = row[2];
        const validity = row[3]; // Assumindo que a validade está na 4ª coluna
        const imageUrl = row[4]; // Assumindo que a URL da imagem está na 5ª coluna

        // Cria uma linha para exibir os dados
        const rowElement = document.createElement("div");
        rowElement.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Descrição:</strong> ${description}</p>
            <p><strong>Validade:</strong> ${validity}</p>
            <img src="${imageUrl}" alt="${name}" style="width: 100px; height: auto;">
            <button onclick="updateData(${id}, '${name}', '${description}', '${validity}', '${imageUrl}')">Atualizar</button>
            <button onclick="deleteData(${id})">Deletar</button>
        `;
        dataDisplay.appendChild(rowElement);
    });
}

