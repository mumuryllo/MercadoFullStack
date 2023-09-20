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

listarProdutos(); 
cadastrarButton.addEventListener('click', cadastrarProduto);