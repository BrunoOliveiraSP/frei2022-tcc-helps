

import { Router } from "express";
import { inserirPagamento, inserirPedido, inserirPedidoItem } from "../repository/pedidoRepository.js";
import { buscarProdutoPorId } from "../repository/produtoRepository.js";
import { acharCupom, criarNotaFiscal, criarNovoPedido } from "../service/novoProdutoService.js";
const server = Router();



server.post('/api/pedido/:idUsuario/', async (req, resp) => {
    try {
        const { idUsuario } = req.params;
        const info = req.body;


        const idCupom = await acharCupom(info.cupom);
        const novoPedido = criarNovoPedido(idUsuario, idCupom, info);

        const idPedidoCriado = await inserirPedido(novoPedido);
        await inserirPagamento(idPedidoCriado, info.cartao);

        for (let item of info.produtos) {
            const prod = await buscarProdutoPorId(item.id);
            await inserirPedidoItem(idPedidoCriado, prod.id, item.qtd, prod.preco);
        }

        resp.status(204).send();

    }
    catch (err) {
        console.log(err);
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;