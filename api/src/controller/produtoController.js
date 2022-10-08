import { listarProdutosInicio } from "../repository/produtoRepository.js";

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



export default server;