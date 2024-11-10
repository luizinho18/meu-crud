// URL da sua planilha do Google Sheets (com seu Google Apps Script)
const sheetUrl = 'https://script.google.com/macros/s/AKfycbyCwUS-dDj5RfQbSxy-o8deYYXIuyKgd_e4f9zR50QHK7aRIdARq6PXCyKqM216Zc8l/exec?action=read';

// Função para buscar os produtos do Google Sheets
async function fetchProducts() {
    const response = await fetch(sheetUrl);
    const data = await response.json();

    if (data && data.length > 0) {
        displayProducts(data);
    }
}

// Função para exibir os produtos na página
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpa a lista antes de exibir novamente

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Calcula a contagem regressiva
        const validityDate = new Date(product.validity); // Data de validade do produto
        const timeLeft = calculateTimeLeft(validityDate);

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Código de Barras: ${product.barcode}</p>
            <p>Quantidade: ${product.quantity}</p>
            <p>Validade: ${product.validity}</p>
            <p><strong>Contagem Regressiva: </strong><span class="countdown">${timeLeft}</span></p>
        `;
        productList.appendChild(productElement);
    });

    // Atualiza a contagem regressiva a cada segundo
    setInterval(updateCountdown, 1000);
}

// Função para calcular a contagem regressiva
function calculateTimeLeft(validityDate) {
    const now = new Date();
    const timeDifference = validityDate - now;
    
    if (timeDifference <= 0) {
        return 'Produto Vencido';
    }

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `${daysLeft} dias, ${hoursLeft} horas e ${minutesLeft} minutos restantes`;
}

// Função para atualizar a contagem regressiva no DOM
function updateCountdown() {
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
        const validityDate = new Date(countdown.parentElement.querySelector('p:nth-child(4)').textContent.replace('Validade: ', ''));
        const timeLeft = calculateTimeLeft(validityDate);
        countdown.textContent = timeLeft;
    });
}

// Chama a função para buscar os produtos assim que a página carregar
window.onload = fetchProducts;
