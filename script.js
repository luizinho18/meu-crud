const apiUrl = 'https://script.google.com/macros/s/AKfycbwgJTcKSFo_QhAVimjYxkS5qGnPejsbqo_i3uDzbHUT7gioxD0-pkyEi6-5Mzkfg048/exec';

// Função para ler os dados do Google Sheets
function readData() {
    fetch(`${apiUrl}?action=read`)
        .then(response => response.json())  // Recebe os dados em formato JSON
        .then(data => {
            console.log("Produtos lidos da planilha:", data); // Exibe os dados no console para depuração
            displayData(data);  // Exibe os dados na página
        })
        .catch(error => {
            console.error("Erro ao ler dados:", error); // Mostra erros no console
        });
}

// Função para exibir os dados na página
function displayData(data) {
    const dataDisplay = document.getElementById("data-display"); // O elemento onde os dados serão exibidos
    dataDisplay.innerHTML = '';  // Limpa a área onde os produtos serão listados

    if (data.length === 0) {
        dataDisplay.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    data.forEach(row => {
        const name = row[0];  // Nome do produto (primeira coluna)
        const description = row[1];  // Descrição (segunda coluna)
        const validity = row[2];  // Validade (terceira coluna)
        const imageUrl = row[3];  // URL da imagem (quarta coluna)

        // Cria um bloco HTML para exibir cada produto
        const rowElement = document.createElement("div");
        rowElement.classList.add("product");  // Adiciona uma classe para estilizar

        rowElement.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Descrição:</strong> ${description}</p>
            <p><strong>Validade:</strong> ${validity}</p>
            <img src="${imageUrl}" alt="${name}" style="width: 100px; height: auto;">
        `;

        // Adiciona o bloco à página
        dataDisplay.appendChild(rowElement);
    });
}

// Chama a função readData quando o botão é clicado
document.getElementById("show-products-btn").addEventListener("click", readData);
