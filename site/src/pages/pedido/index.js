import './index.scss'
import { useEffect, useState } from 'react'
import ModalEndereco from '../../components/modalEndereco'
import Storage from  'local-storage'

import { listar } from '../../api/enderecoAPI'
import CardEndereco from '../../components/cardEndereco';




export default function Pedido() {
    const [enderecos, setEnderecos] = useState([]);
    const [exibirEndereco, setExibirEndereco] = useState(false);


    async function carregarEnderecos() {
        const id = Storage('cliente-logado').id;
        const r = await listar(id);
        setEnderecos(r);
    }

    function exibirNovoEndereco() {
        setExibirEndereco(true);
    }

    function fecharNovoEndereco() {
        setExibirEndereco(false);
        carregarEnderecos();
    }

    useEffect(() => {
        carregarEnderecos();
    }, [])



    return (
        <div className='pagina-pedido'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />

            
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

                        {enderecos.map(item =>
                            <CardEndereco item={item} />
                        )}
                    </div>

                    <button onClick={exibirNovoEndereco}> Novo </button>

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

