import './index.scss'

import { useEffect, useState} from 'react'
import { buscarProdutos } from '../../../api/produtoAPI';

export default function ConsultarProduto() {
    const [produtos, setProdutos] = useState([]);

    async function carregarProdutos() {
        const r = await buscarProdutos();
        setProdutos(r);
    }


    useEffect(() => {
        carregarProdutos();
    }, []);


    return (
        <div className='pagina-admin-consultar-produto'>
            <h1> Catálogo de Produtos </h1>

            <div className='form'>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Destaque</th>
                            <th>Departamento</th>
                            <th>Qtd. Categorias</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(item =>
                            <tr>
                                <td> {item.id} </td>
                                <td> {item.produto} </td>
                                <td>R$ {item.preco}</td>
                                <td> {item.destaque ? 'Sim' : 'Não'} </td>
                                <td> {item.departamento} </td>
                                <td> {item.qtdCategorias} </td>
                                <td><span>Editar</span></td>
                                <td><span>Remover</span></td>
                            </tr>    
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}