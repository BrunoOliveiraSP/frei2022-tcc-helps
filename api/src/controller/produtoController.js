import { buscarProdutoCategorias, buscarProdutoImagens, buscarProdutoPorId, listarProdutosInicio } from "../repository/produtoRepository.js";

import { Router } from "express";
const server = Router();


server.get('/api/produto', async (req, resp) => {
    try {
        const r = await listarProdutosInicio();
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/api/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;

        const produto = await buscarProdutoPorId(id);
        const categorias = await buscarProdutoCategorias(id);
        const imagens = await buscarProdutoImagens(id);

        resp.send({
            info: produto,
            categorias: categorias,
            imagens: imagens
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;