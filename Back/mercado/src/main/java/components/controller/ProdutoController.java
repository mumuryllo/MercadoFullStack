package components.controller;

import components.model.ProdutoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import components.service.ProdutoService;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://127.0.0.1:5500/")
public class ProdutoController {


    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<ProdutoModel> listarProdutos() {
        return service.listarProdutos();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProdutoModel> findById(@PathVariable Long id){
        ProdutoModel obj = service.listarProdutoId(id);
        return  ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ProdutoModel cadastrarProduto(@RequestBody ProdutoModel produto) {
        return service.cadastrarProduto(produto);
    }

}
