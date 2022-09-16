import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function listarDepartamentos() {
    const r = await api.get('/api/departamento');
    return r.data;
}

