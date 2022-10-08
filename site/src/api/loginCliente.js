import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})


export async function logar(email, senha) {
    const r = await api.post('/login', { email, senha });
    return r.data;
}

