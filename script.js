// script.js

// Função para calcular a contagem regressiva
function calcularContagemRegressiva(dataValidade) {
    const agora = new Date();
    const validade = new Date(dataValidade);
    const tempoRestante = validade - agora;

    if (tempoRestante <= 0) {
        return "Expirado";
    }

    const diasRestantes = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutosRestantes = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundosRestantes = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    return `${diasRestantes}d ${horasRestantes}h ${minutosRestantes}m ${segundosRestantes}s`;
}

// Função para adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const validade = document.getElementById("validade").value;

    if (nome && quantidade && validade) {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        const produto = {
            nome,
            quantidade,
            validade,
        };

        produtos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        atualizarLista();
        limparCampos();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para atualizar a lista de produtos
function atualizarLista() {
    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = "";

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtos.forEach((produto, index) => {
        const divProduto = document.createElement("div");
        divProduto.classList.add("product-item");

        // Calculando a contagem regressiva
        const countdown = calcularContagemRegressiva(produto.validade);

        divProduto.innerHTML = `
            <span>${produto.nome} - ${produto.quantidade} unidades</span>
            <span class="countdown" id="countdown${index}">${countdown}</span>
            <button onclick="excluirProduto(${index})">Excluir</button>
        `;
        listaProdutos.appendChild(divProduto);

        // Atualizar a contagem regressiva a cada segundo
        setInterval(() => {
            const countdownElement = document.getElementById(`countdown${index}`);
            const newCountdown = calcularContagemRegressiva(produto.validade);
            countdownElement.textContent = newCountdown;
        }, 1000);
    });
}

// Função para excluir um produto
function excluirProduto(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    atualizarLista();
}

// Função para limpar os campos do formulário
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("validade").value = "";
}

// Atualizar a lista de produtos quando a página for carregada
window.onload = atualizarLista;
