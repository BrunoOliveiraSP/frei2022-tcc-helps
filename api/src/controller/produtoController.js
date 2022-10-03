import multer from 'multer'
import { Router } from 'express';

import { buscarProdutos, salvarProduto, salvarProdutoCategoria, salvarProdutoImagem } from '../repository/produtoRepository.js';
import { buscarCategoriaPorId } from '../repository/categoriaRepository.js';
import { validarProduto } from '../service/produtoValidacao.js';


const server = Router();
const upload = multer({ dest: 'storage/produto' })



server.post('/admin/produto', async (req, resp) => {
    try {
        const produto = req.body;

        await validarProduto(produto);

        const idProduto = await salvarProduto(produto);
        
        for (const idCateg of produto.categorias) {
            const cat = await buscarCategoriaPorId(idCateg);
            
            if (cat != undefined)
                await salvarProdutoCategoria(idProduto, idCateg);
        }

        resp.send({
            id: idProduto
        });

    }
    catch (err) {
        return resp.status(400).send({
            erro: err.message
        })
    }
})




server.put('/admin/produto/:id', upload.array('imagens'), async (req, resp) => {
    try {
        const id = req.params.id;
        const imagens = req.files;

        console.log(id);
        console.log(imagens);

        for (const imagem of imagens) {
            await salvarProdutoImagem(id, imagem.path);
        }

        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/admin/produto', async (req, resp) => {
    try {
        const r = await buscarProdutos();
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;
