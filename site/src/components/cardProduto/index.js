import { API_URL } from '../../api/config';
import './index.scss'

import { useNavigate } from 'react-router-dom'

export default function CardProduto(props) {

    const navigate = useNavigate();

    function exibir(imagem) {
        if (!imagem)
            return `/produto-padrao.png`;
        else 
            return `${API_URL}/${imagem}`
    }

    function formatarPreco(preco) {
        return preco.toFixed(2).replace('.', ',');
    }

    function abrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    return (
        <div className='comp-card-produto' onClick={() => abrirDetalhes(props.item.id)}>
            <img src={exibir(props.item.imagem)} alt="" />
            <div>
                <div> {props.item.departamento} </div>
                <div> {props.item.produto} </div>
                <div> R$ {formatarPreco(props.item.preco)} </div>
            </div>
        </div>
    )
}

