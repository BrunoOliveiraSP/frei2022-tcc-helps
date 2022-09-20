
import { Router } from 'express';
import { salvarProduto, salvarProdutoCategoria } from '../repository/produtoRepository.js';
const server = Router();


server.post('/admin/produto', async (req, resp) => {
    try {
        const produto = req.body;

        const idProduto = await salvarProduto(produto);
        
        for (const idCateg of produto.categorias) {
            await salvarProdutoCategoria(idProduto, idCateg);
        }

        
        resp.status(204).send();
    }
    catch (err) {
        return resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;