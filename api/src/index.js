import 'dotenv/config'

import categoriaController from './controller/categoriaController.js';
import departamentoController from './controller/departamentoController.js'
import produtoController from './controller/produtoController.js'

import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());



server.use(categoriaController);
server.use(departamentoController);
server.use(produtoController);
 


const PORT = process.env.PORT;
server.listen(PORT, () => console.log("API subiu na porta " + PORT));
