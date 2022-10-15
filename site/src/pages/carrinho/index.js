import './index.scss'

import { useEffect, useState } from 'react'
import Storage from 'local-storage'
import { buscarProdutoPorId } from '../../api/produtoAPI';
import CarrinhoItem from '../../components/carrinhoItem';
import { useNavigate } from 'react-router-dom';

export default function Carrinho() {
    const [itens, setItens] = useState([]);


    const navigate = useNavigate();

    function irPedido() {
        navigate('/pedido')
    }



    function qtdItens() {
        return itens.length;
    }

    function calcularValorTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.produto.info.preco * item.qtd;
        }
        return total;
    }


    function removerItem(id) {
        let carrinho = Storage('carrinho');
        carrinho = carrinho.filter(item => item.id != id);

        Storage('carrinho', carrinho);
        carregarCarrinho();
    }


    async function carregarCarrinho() {
        let carrinho = Storage('carrinho');
        if (carrinho) {

            let temp = [];
            
            for (let produto of carrinho) {
                let p = await buscarProdutoPorId(produto.id);
                
                temp.push({
                    produto: p,
                    qtd: produto.qtd
                })
            }

            setItens(temp);
        }

    }

    useEffect(() => {
        carregarCarrinho();
    }, [])


    return (
        <div className='pagina-carrinho'>

            <h1> Carrinho </h1>

            <div className='carrinho'>

                <div className='itens'>

                    {itens.map(item => 
                        <CarrinhoItem
                            item={item}
                            removerItem={removerItem}
                            carregarCarrinho={carregarCarrinho} />
                    )}

                </div>

                
                <div className='resumo'>
                    <h1> Subtotal </h1>
                    <h3> ({qtdItens()} itens) </h3>
                    <p> R$ {calcularValorTotal()} </p>
                    <button onClick={irPedido}> Fechar Pedido </button>
                </div>


            </div>

        </div>
    )
}

