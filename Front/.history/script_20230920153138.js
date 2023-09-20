const apiUrl = 'http://localhost:8080/api/produtos';

function listarProdutos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = '';
            data.forEach(produto => {
                const li = document.createElement('li');
                li.textContent = `${produto.nome} - ${produto.descricao}`;
                productList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao buscar produtos: ', error));
}

function cadastrarProduto() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidadeEmEstoque = parseInt(document.getElementById('quantidade').value);

    const novoProduto = {
        nome,
        descricao,
        preco,
        quantidadeEmEstoque
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Produto cadastrado com sucesso: ', data);
        listarProdutos(); // Atualiza a lista de produtos após o cadastro
        produtoForm.reset(); // Limpa o formulário
    })
    .catch(error => console.error('Erro ao cadastrar produto: ', error));
}

listarProdutos(); // Listar produtos quando a página carregar
cadastrarButton.addEventListener('click', cadastrarProduto);