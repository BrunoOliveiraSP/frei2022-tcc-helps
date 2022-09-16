import './index.scss'

import { listarCategorias } from '../../../api/categoriaAPI'
import { useEffect, useState } from 'react'

export default function Produto() {
    const [idCategoria, setIdCategoria] = useState();

    const [categorias, setCategorias] = useState([]);


    function salvar() {
        alert(idCategoria);
    }



    async function carregarCategorias() {
        const r = await listarCategorias();
        setCategorias(r);
    }

    useEffect(() => {
        carregarCategorias();
    }, [])


    return (
        <div className='pagina-admin-produto'>
            <h1> Produto </h1>

            <div>
                Categoria:
                <select value={idCategoria} onChange={e => setIdCategoria(e.target.value)}>
                    {categorias.map(item =>
                        <option value={item.id}> {item.categoria} </option>
                    )}
                </select>
            </div>
            <div>
                Departamento: <select></select>
            </div>

            <button onClick={salvar}> Salvar </button>
        </div>
    )
}