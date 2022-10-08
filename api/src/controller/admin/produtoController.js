import multer from 'multer'
import { Router } from 'express';

import { alterarProduto, buscarProdutoCategorias, buscarProdutoImagens, buscarProdutoPorId, buscarProdutos, removerProduto, removerProdutoCategorias, removerProdutoImagens, removerProdutoImagensDiferentesDe, salvarProduto, salvarProdutoCategoria, salvarProdutoImagem } from '../../repository/produtoRepository.js';
import { buscarCategoriaPorId } from '../../repository/categoriaRepository.js';
import { validarProduto } from '../../service/produtoValidacao.js';


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




server.put('/admin/produto/:id/imagem', upload.array('imagens'), async (req, resp) => {
    try {
        const id = req.params.id;
        const imagens = req.files;
        const imagensPermancem = req.body.imagens.filter(item => item != 'undefined');


        if (imagensPermancem.length > 0)
            await removerProdutoImagensDiferentesDe(imagensPermancem);
        else
            await removerProdutoImagens(id);

        
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


server.delete('/admin/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;

        await removerProdutoCategorias(id);
        await removerProdutoImagens(id);
        await removerProduto(id);

        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/admin/produto/:id', async (req, resp) => {
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


server.put('/admin/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const produto = req.body;
        
        
        // remover categorias atuais E imagens sobrescritas
        await removerProdutoCategorias(id);
        

        // alterando informacoes do produto
        await alterarProduto(id, produto);


        // inserindo novas categorias
        for (const idCateg of produto.categorias) {
            const cat = await buscarCategoriaPorId(idCateg);
            
            if (cat != undefined)
                await salvarProdutoCategoria(id, idCateg);
        }
        
        resp.status(204).send();

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;
