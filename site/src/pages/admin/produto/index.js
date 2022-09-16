import './index.scss'

import { listarCategorias } from '../../../api/categoriaAPI'
import { listarDepartamentos } from '../../../api/departamentoAPI'
import { useEffect, useState } from 'react'

export default function Produto() {
    const [idCategoria, setIdCategoria] = useState();
    const [categorias, setCategorias] = useState([]);

    const [idDepartamento, setIdDepartamento] = useState();
    const [departamentos, setDepartamentos] = useState([]);


    function salvar() {
        alert('Categoria: ' + idCategoria + ', Departamento: ' + idDepartamento);
    }


    async function carregarDepartamentos() {
        const r = await listarDepartamentos();
        setDepartamentos(r);
    }


    async function carregarCategorias() {
        const r = await listarCategorias();
        setCategorias(r);
    }


    useEffect(() => {
        carregarCategorias();
        carregarDepartamentos();
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
                    <select value={idDepartamento} onChange={e => setIdDepartamento(e.target.value)}>
                        <option selected disabled hidden>Selecione</option>

                        {departamentos.map(item =>
                            <option value={item.id}> {item.departamento} </option>
                        )}
                    </select>
                </div>



                <div>
                    <label>Categoria:</label>
                    <div className='gpo-categoria'>
                        <select value={idCategoria} onChange={e => setIdCategoria(e.target.value)} >
                            <option selected disabled hidden>Selecione</option>

                            {categorias.map(item =>
                                <option value={item.id}> {item.categoria} </option>
                            )}
                        </select>
                        <button className='btn-categoria'>+</button>
                    </div>
                </div>



                <div>
                    <button onClick={salvar}> Salvar </button>
                </div>

            </div>

        </div>
    )
}