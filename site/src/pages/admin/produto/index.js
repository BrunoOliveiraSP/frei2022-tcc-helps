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
            <h1> Novo Produto </h1>

            <div className='form'>

                <div>
                    <label> Produto: </label>
                    <input type='text' />
                </div>

                <div>
                    <label> Preço: </label>
                    <input type='text' />
                </div>

                <div>
                    <label> Destaque: </label>
                    <input type='checkbox' />
                </div>
               

                
                <div>
                    <label>Departamento:</label>
                    <select></select>
                </div>

                

                <div>
                    <label>Categoria:</label>
                    <select
                        value={idCategoria}
                        onChange={e => setIdCategoria(e.target.value)}
                    >
                        <option selected disabled hidden>Selecione</option>

                        {categorias.map(item =>
                            <option value={item.id}> {item.categoria} </option>
                        )}
                    </select>
                    <button className='btn-categoria'>+</button>
                </div>

                
                
                <div>
                    <button onClick={salvar}> Salvar </button>
                </div>

            </div>

        </div>
    )
}