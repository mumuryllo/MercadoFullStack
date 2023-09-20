package components.service;

import components.model.ProdutoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import components.repository.ProdutoRepository;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<ProdutoModel> listarProdutos(){
        return repository.findAll();
    }

    public ProdutoModel cadastrarProduto(ProdutoModel obj){
        return repository.save(obj);
    }

}
