import 'dotenv/config'

import adminCategoriaController from './controller/admin/categoriaController.js';
import adminDepartamentoController from './controller/admin/departamentoController.js'
import adminProdutoController from './controller/admin/produtoController.js'

import loginClienteController from './controller/loginClienteController.js'
import produtoController from './controller/produtoController.js'


import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());



server.use(adminCategoriaController);
server.use(adminDepartamentoController);
server.use(adminProdutoController);

server.use(loginClienteController);
server.use(produtoController);


server.use('/storage/produto', express.static('storage/produto'));


const PORT = process.env.PORT;
server.listen(PORT, () => console.log("API subiu na porta " + PORT));
