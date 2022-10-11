import './index.scss'

import { useState } from 'react'

export default function Pedido() {


    return (
        <div className='pagina-pedido'>

            <div className='pedido-box'>
                <h1> Pedido </h1>
                <div className='finalizar'>
                    <div>Total: <span> R$ 1280,00</span></div>
                    <button> Finalizar Pedido </button>
                </div>
            </div>

            <div className='info'>
                <div>
                    <h2>Endereços</h2>

                    <div className='enderecos'>

                        <div className='endereco'>
                            <div className='tipo'>CASA</div>
                            <div>
                                <div className='end'>Av. Interlagos Interlagos Interlagos Interlagos, 333 - pontoasdfasdfa sdfasdfasfa</div>
                                <div className='cep'>04455-444 - São Paulo/SP</div>
                            </div>
                        </div>
                        <div className='endereco'>
                            <div className='tipo'>CASA</div>
                            <div>
                                <div className='end'>Av. Interlagos Interlagos Interlagos Interlagos, 333 - pontoasdfasdfa sdfasdfasfa</div>
                                <div className='cep'>04455-444 - São Paulo/SP</div>
                            </div>
                        </div>

                    </div>

                    <button> Novo </button>

                </div>

                <div className='pagamento-box'>
                    <h2>Pagamento</h2>

                    <div className='form'>
                        <div>
                            <label>Nome:</label>
                            <input type='text' />
                        </div>
                        <div>
                            <label>Número:</label>
                            <input type='text' />
                        </div>
                        <div>
                            <label>Validade:</label>
                            <input type='text' />
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input type='text' />
                        </div>
                        <div />
                    </div>
                </div>
            </div>


            <div className='itens'>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantidade</th>
                            <th>Preço Unitário</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr>
                            <td>
                                <div className='celula-item'>
                                    <img src='/produto-padrao.png' />
                                    <div>
                                        <h3> Produto aqui </h3>
                                        <h4> Departamento </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                2
                            </td>
                            <td>
                                R$ 34,00
                            </td>
                            <td>
                                R$ 68,00
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

