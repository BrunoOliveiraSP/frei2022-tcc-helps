import { API_URL } from './config'
import axios from 'axios'

const api = axios.create({
    baseURL: API_URL
})


export async function salvarProduto(nome, preco, destaque, idDepartamento, categorias) {
    const r = await api.post('/admin/produto', { nome, preco, destaque, idDepartamento, categorias });
    return r.data;
}