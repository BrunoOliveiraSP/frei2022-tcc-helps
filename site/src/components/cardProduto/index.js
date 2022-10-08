import { API_URL } from '../../api/config';
import './index.scss'

export default function CardProduto(props) {

    function exibir(imagem) {
        if (!imagem)
            return `/produto-padrao.png`;
        else 
            return `${API_URL}/${imagem}`
    }

    function formatarPreco(preco) {
        return preco.toFixed(2).replace('.', ',');
    }

    return (
        <div className='comp-card-produto'>
            <img src={exibir(props.item.imagem)} alt="" />
            <div>
                <div> {props.item.departamento} </div>
                <div> {props.item.produto} </div>
                <div> R$ {formatarPreco(props.item.preco)} </div>
            </div>
        </div>
    )
}

