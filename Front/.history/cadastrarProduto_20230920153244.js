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
            listarProdutos();
            produtoForm.reset();
            try { } catch (error) { } console.error('Erro ao cadastrar produto: ', error);
        });
}
