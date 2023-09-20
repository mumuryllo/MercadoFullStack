document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('produto-list');
    const produtoForm = document.getElementById('produto-form');
    const cadastrarButton = document.getElementById('cadastrar');

    function listarProdutos() {
        fetch('http://localhost:8080/produtos') // Certifique-se de usar o endereço correto
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';
                data.forEach(produto => {
                    const li = document.createElement('li');
                    li.textContent = `${produto.nome} - ${produto.descricao} - ${produto.preco} - ${produto.}`;
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

        fetch('http://localhost:8080/produtos', { // Certifique-se de usar o endereço correto
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto cadastrado com sucesso: ', data);
            listarProdutos(); 
            produtoForm.reset();
        })
        .catch(error => console.error('Erro ao cadastrar produto: ', error));
    }

    listarProdutos(); 

    cadastrarButton.addEventListener('click', cadastrarProduto);
});