import './index.scss'
import { useEffect, useState } from 'react'
import ModalEndereco from '../../components/modalEndereco'
import Storage, { set } from 'local-storage'

import { useNavigate } from 'react-router-dom'
import { listar } from '../../api/enderecoAPI'
import CardEndereco from '../../components/cardEndereco';
import { buscarProdutoPorId } from '../../api/produtoAPI'
import { API_URL } from '../../api/config'
import { salvarNovoPedido } from '../../api/pedidoAPI'
import { toast } from 'react-toastify'




export default function Pedido() {
    const [itens, setItens] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [exibirEndereco, setExibirEndereco] = useState(false);

    const [idEndereco, setIdEndereco] = useState();
    

    const [cupom, setCupom] = useState('');
    const [frete, setFrete] = useState('');

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [cvv, setCvv] = useState('');
    const [tipo, setTipo] = useState('');
    const [parcela, setParcela] = useState('');


    const navigate = useNavigate();

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



    async function carregarItens() {
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

    function calcularTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.qtd * item.produto.info.preco;
        }
        return total;
    }

    function exibirImagem(item) {
        if (item.produto.imagens.length > 0)
            return API_URL + '/' + item.produto.imagens[0];
        else
            return '/produto-padrao.png';
    }



    async function salvarPedido() {

        try {
            let produtos = Storage('carrinho');
            let id = Storage('cliente-logado').id;

            let pedido =
            {
                cupom: cupom,
                frete: frete,
                idEndereco: idEndereco,
                tipoPagamento: 'Cartão',
                cartao: {
                    nome: nome,
                    numero: numero,
                    vencimento: vencimento,
                    codSeguranca: cvv,
                    formaPagamento: tipo,
                    parcelas: parcela
                },
                produtos: produtos
            }

            const r = await salvarNovoPedido(id, pedido);
            toast.dark('Pedido foi inserido com sucesso');
            Storage('carrinho', []);
            navigate('/');

        }
        catch (err) {
            toast.error(err.response.data.erro);
        }

    }




    useEffect(() => {
        carregarEnderecos();
        carregarItens();
    }, [])



    return (
        <div className='pagina-pedido'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />


            <div className='pedido-box'>
                <h1> Pedido </h1>
                <div className='finalizar'>
                    <div>Total: <span> R$ {calcularTotal()}</span></div>
                    <button onClick={salvarPedido}> Finalizar Pedido </button>
                </div>
            </div>


            <div className='info'>
                <div>
                    <h2>Endereços</h2>

                    <div className='enderecos'>

                        {enderecos.map(item =>
                            <CardEndereco item={item} selecionar={setIdEndereco} selecionado={item.id == idEndereco} />
                        )}
                    </div>

                    <button onClick={exibirNovoEndereco}> Novo </button>

                </div>

                <div className='pagamento-box'>
                    <h2>Pagamento</h2>

                    <div className='form'>
                        <div>
                            <label>Nome:</label>
                            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div>
                            <label>Número:</label>
                            <input type='text' value={numero} onChange={e => setNumero(e.target.value)} />
                        </div>
                        <div>
                            <label>Validade:</label>
                            <input type='text' value={vencimento} onChange={e => setVencimento(e.target.value)} />
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input type='text' value={cvv} onChange={e => setCvv(e.target.value)} />
                        </div>
                        <div>
                            <label>Tipo de Pagamento:</label>
                            <select value={tipo} onChange={e => setTipo(e.target.value)}   >
                                <option disabled hidden selected>Selecione</option>
                                <option>Crédito</option>
                                <option>Débito</option>
                            </select>
                        </div>
                        <div>
                            <label>Parcelas:</label>
                            <select value={parcela} onChange={e => setParcela(e.target.value)}  >
                                <option disabled hidden selected>Selecione</option>
                                <option value={1}>01x à Vista</option>
                                <option value={1}>01x sem Juros</option>
                                <option value={2}>02x sem Juros</option>
                                <option value={3}>03x sem Juros</option>
                            </select>
                        </div>
                        <div />
                    </div>

                    <div className='info-extra'>
                        <div>
                            <h2> Cupom </h2>
                            <div className='form'>
                                <div>
                                    <label>Código:</label>
                                    <input type='text' value={cupom} onChange={e => setCupom(e.target.value)} />
                                </div>
                                <div />
                            </div>
                        </div>
                        <div>
                            <h2> Frete </h2>
                            <div className='form'>
                                <div>
                                    <label>Tipo:</label>
                                    <select value={frete} onChange={e => setFrete(e.target.value)}  >
                                        <option disabled hidden selected>Selecione</option>
                                        <option value={'Normal'}>Normal - R$ 10,00</option>
                                        <option value={'Sedex'}>Sedex - R$ 25,00</option>
                                    </select>
                                </div>
                                <div />
                            </div>
                        </div>
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

                        {itens.map(item =>
                            <tr>
                                <td>
                                    <div className='celula-item'>
                                        <img src={exibirImagem(item)} />
                                        <div>
                                            <h3> {item.produto.info.produto} </h3>
                                            <h4> {item.produto.info.nomeDepartamento} </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.qtd}
                                </td>
                                <td>
                                    R$ {item.produto.info.preco}
                                </td>
                                <td>
                                    R$ {item.qtd * item.produto.info.preco}
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

