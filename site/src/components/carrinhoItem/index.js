import { API_URL } from '../../api/config';
import './index.scss'

import Storage from 'local-storage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function CarrinhoItem({ item: { produto: { info, categorias, imagens }, qtd }, removerItem, carregarCarrinho }) {
    const [qtdProduto, setQtdProduto] = useState(qtd);


    function remover() {
        removerItem(info.id);
    }


    function exibirImagem() {
        if (imagens.length > 0) {
            return API_URL + '/' + imagens[0]; 
        }
        else {
            return '/produto-padrao.png'
        }
    }

    function calcularSubtotal() {
        const subtotal = qtdProduto * info.preco;
        return subtotal;
    }

    function alterarQuantidade(novaQtd) {
        setQtdProduto(novaQtd);
        
        let carrinho = Storage('carrinho');
        let itemStorage = carrinho.find(item => item.id == info.id);
        itemStorage.qtd = novaQtd;

        Storage('carrinho', carrinho);
        carregarCarrinho();
    }


    return (
        <div className='comp-carrinho-item'>
            <div className='produto-container'>
                <div className='produto-box'>
                    <div className='imagens'>
                        <div className='atual'>
                            <img src={exibirImagem()} />
                        </div>
                    </div>
                    <div className='detalhes'>
                        <div className='nome'> {info.produto} </div>
                        <div className='departamento'> {info.nomeDepartamento} </div>

                        <div className='preco-label'> PREÇO </div>
                        <div className='preco'> R$ {info.preco} </div>
                    </div>
                </div>
                <div className='qtd-box'>
                    <div className='qtd'>
                        <label>Qtd.</label>
                        <select onChange={e => alterarQuantidade(e.target.value)} value={qtdProduto}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className='subtotal'>
                        <div>Subtotal</div>
                        <div>R$ {calcularSubtotal()}</div>
                    </div>
                    <div className='excluir' onClick={remover}>
                        excluir
                    </div>
                </div>
            </div>
        </div>
    )
}

