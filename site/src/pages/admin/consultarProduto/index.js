import './index.scss'
import { toast } from 'react-toastify';

import { useEffect, useState} from 'react'
import { buscarProdutos, removerProduto } from '../../../api/admin/produtoAPI';
import { useNavigate } from 'react-router-dom';

export default function ConsultarProduto() {
    const [produtos, setProdutos] = useState([]);


    const navigate = useNavigate();


    async function carregarProdutos() {
        const r = await buscarProdutos();
        setProdutos(r);
    }

    async function deletarProduto(id) {
        try {
            await removerProduto(id);
            await carregarProdutos();
            toast.dark('Produto removido com sucesso');
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }

    function editar(id) {
        navigate(`/admin/produto/${id}`)
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
                                <td><span onClick={() => editar(item.id)}>Editar</span></td>
                                <td><span onClick={() => deletarProduto(item.id)}>Remover</span></td>
                            </tr>    
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}