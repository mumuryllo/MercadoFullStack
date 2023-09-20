document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('produto-list');
    const produtoForm = document.getElementById('produto-form');
    const cadastrarButton = document.getElementById('cadastrar');
    const buscarForm = document.getElementById('buscar-form'); 
    const buscarButton = document.getElementById('buscar'); 

    function listarProdutos() {
        fetch('http://localhost:8080/produtos') 
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';
                data.forEach(produto => {
                    const li = document.createElement('li');
                    li.textContent = `${produto.nome} - ${produto.descricao} - ${produto.preco} - ${produto.quantidadeEstoque}`;
                    productList.appendChild(li);
                });
            })
            .catch(error => console.error('Erro ao buscar produtos: ', error));
    }

    function cadastrarProduto() {
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const quantidadeEstoque = parseInt(document.getElementById('quantidade').value);

        const novoProduto = {
            nome,
            descricao,
            preco,
            quantidadeEstoque
        };

        fetch('http://localhost:8080/produtos', { 
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


    buscarButton.addEventListener('click', () => {
        const produtoId = document.getElementById('produto-id').value;
        buscarProdutoPorId(produtoId);
    });
});


function buscarProdutoPorId(id) {
    fetch(`http://localhost:8080/produtos/${id}`)
        .then(response => response.json())
        .then(produto => {
            const detalhesProduto = document.getElementById('detalhes-produto');
            detalhesProduto.innerHTML = `
                <h2>Detalhes do Produto</h2>
                <p><strong>Nome:</strong> ${produto.nome}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Preço:</strong> ${produto.preco}</p>
                <p><strong>Quantidade em Estoque:</strong> ${produto.quantidadeEstoque}</p>
            `;
        })
        .catch(error => {
            console.error('Erro ao buscar produto por ID: ', error);
            const detalhesProduto = document.getElementById('detalhes-produto');
            detalhesProduto.innerHTML = '<p>Produto não encontrado ou erro na busca.</p>';
        });
}