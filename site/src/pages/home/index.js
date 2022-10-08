import { useEffect, useState } from 'react';
import { listarProdutosInicio } from '../../api/produtoAPI'
import CardProduto from '../../components/cardProduto'
import './index.scss'

export default function Home() {
    const [produtos, setProdutos] = useState([]);

    async function listar() {
        const r = await listarProdutosInicio();
        setProdutos(r);
    }


    useEffect(() => {
        listar();
    }, [])


    return (
        <div className='pagina-home'>
            <h1> Seja bem-vindo a melhor Livraria de SP! </h1>

            <div className="produtos-container">
                {produtos.map(item => 
                    <CardProduto item={item} />
                )}
                
            </div>
        </div>
    )
}