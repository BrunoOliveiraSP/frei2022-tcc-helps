import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarProdutosInicio } from '../../api/produtoAPI'
import CardProduto from '../../components/cardProduto'
import './index.scss'

export default function Home() {
    const [produtos, setProdutos] = useState([]);

    const navigate = useNavigate();

    function irCarrinho() {
        navigate('/carrinho')
    }

    async function listar() {
        const r = await listarProdutosInicio();
        setProdutos(r);
    }


    useEffect(() => {
        listar();
    }, [])


    return (
        <div className='pagina-home'>
            <div className='cabecalho'>
                <h1> Seja bem-vindo a melhor Livraria de SP! </h1>
                <button onClick={irCarrinho}> Ir para o Carrinho </button>
            </div>

            <div className="produtos-container">
                {produtos.map(item => 
                    <CardProduto item={item} />
                )}
                
            </div>
        </div>
    )
}