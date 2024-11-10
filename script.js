const apiUrl = 'https://script.google.com/macros/s/AKfycbwgJTcKSFo_QhAVimjYxkS5qGnPejsbqo_i3uDzbHUT7gioxD0-pkyEi6-5Mzkfg048/exec';

// Função para criar um produto
function createProduct() {
    const barcode = document.getElementById("barcode").value;
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const validity = document.getElementById("validity").value;

    fetch(`${apiUrl}?action=create&barcode=${barcode}&name=${name}&quantity=${quantity}&validity=${validity}`, {
        method: 'POST',
    }).then(response => response.json())
      .then(data => {
        console.log("Produto cadastrado com sucesso:", data);
        alert("Produto cadastrado com sucesso!");
        readProducts(); // Atualiza a lista
      })
      .catch(error => console.error("Erro ao cadastrar produto:", error));
}

// Função para ler os produtos
function readProducts() {
    fetch(`${apiUrl}?action=read`)
        .then(response => response.json())
        .then(data => {
            console.log("Produtos lidos:", data);
            displayProducts(data);
        })
        .catch(error => console.error("Erro ao ler dados:", error));
}

// Função para exibir os produtos na tela
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        return;
    }

    products.forEach(product => {
        const [barcode, name, quantity, validity, daysRemaining] = product;

        // Cria um elemento HTML para cada produto
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
