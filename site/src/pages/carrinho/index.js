import './index.scss'

import { useState } from 'react'

export default function Carrinho() {


    return (
        <div className='pagina-carrinho'>

            <h1> Carrinho </h1>

            <div className='carrinho'>

                <div className='itens'>

                    <div className='produto'>
                        <div className='produto-container'>
                            <div className='produto-box'>
                                <div className='imagens'>
                                    <div className='atual'>
                                        <img src='/produto-padrao.png' />
                                    </div>
                                </div>
                                <div className='detalhes'>
                                    <div className='nome'> Nome do Produto top aqui </div>
                                    <div className='departamento'> Departamento aqui </div>

                                    <div className='preco-label'> PREÇO </div>
                                    <div className='preco'> R$ 123,45 </div>
                                </div>
                            </div>
                            <div className='qtd-box'>
                                <div className='qtd'>
                                    <label>Qtd.</label>
                                    <select>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                    </select>
                                </div>
                                <div className='subtotal'>
                                    <div>Subtotal</div>
                                    <div>R$ 200,00</div>
                                </div>
                                <div className='excluir'>
                                    excluir
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                
                <div className='resumo'>
                    <h1> Subtotal </h1>
                    <h3> (3 itens) </h3>
                    <p> R$ 9999,00 </p>
                    <button> Fechar Pedido </button>
                </div>


            </div>

        </div>
    )
}

