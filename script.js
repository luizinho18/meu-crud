const apiUrl = 'https://script.google.com/macros/s/AKfycbybyvuwcmqml3KxC2ew0KzAnE25kaBFyFpzvRA3k8oLPctiViaccEws1II_Ven5XN8f/exec'; // Substitua pelo seu ID do script

// Função para cadastrar produto
function createProduct() {
    const barcode = document.getElementById("barcode").value;
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const validity = document.getElementById("validity").value;

    if (!barcode || !name || !quantity || !validity) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Envia dados para o Google Apps Script
    fetch(`${apiUrl}?action=create&barcode=${barcode}&name=${name}&quantity=${quantity}&validity=${validity}`, {
        method: 'GET',  // 'GET' para enviar dados pela URL
    })
    .then(response => response.text())  // Resposta do servidor em texto
    .then(data => {
        console.log(data);
        alert(data);  // Exibe mensagem de sucesso ou erro
        readProducts();  // Atualiza a lista de produtos
    })
    .catch(error => {
        console.error("Erro ao cadastrar produto:", error);
        alert("Erro ao cadastrar produto.");
    });
}

// Função para ler os produtos da planilha
function readProducts() {
    fetch(`${apiUrl}?action=read`)
        .then(response => response.json())  // Espera uma resposta JSON
        .then(data => {
            displayProducts(data);  // Passa os dados para exibição
        })
        .catch(error => {
            console.error("Erro ao carregar produtos:", error);
            alert("Erro ao carregar produtos.");
        });
}

// Função para exibir os produtos no HTML
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = '';  // Limpa a lista antes de mostrar novos produtos

    if (products.length === 0) {
        productList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        return;
    }

    products.forEach(product => {
        const [barcode, name, quantity, validity, daysRemaining] = product;

        const productElement = document.createElement("div");
        productElement.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Código de Barras:</strong> ${barcode}</p>
            <p><strong>Quantidade:</strong> ${quantity}</p>
            <p><strong>Data de Validade:</strong> ${validity}</p>
            <p><strong>Contagem Regressiva:</strong> ${daysRemaining} dias restantes</p>
        `;
        productList.appendChild(productElement);
    });
}
