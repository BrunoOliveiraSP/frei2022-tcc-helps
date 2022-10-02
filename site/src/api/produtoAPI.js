import { API_URL } from './config'
import axios from 'axios'

const api = axios.create({
    baseURL: API_URL
})


export async function salvarProduto(nome, preco, destaque, idDepartamento, categorias) {
    const r = await api.post('/admin/produto', { nome, preco, destaque, idDepartamento, categorias });
    return r.data;
}


export async function salvarImagens(id, imagem1, imagem2, imagem3, imagem4) {
    
    let form = new FormData();
    form.append('imagens', imagem1);
    form.append('imagens', imagem2);
    form.append('imagens', imagem3);
    form.append('imagens', imagem4);

    const r = await api.put('/admin/produto/' + id, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return r.data;
}