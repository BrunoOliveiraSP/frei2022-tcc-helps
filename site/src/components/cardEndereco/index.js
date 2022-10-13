import './index.scss'

export default function CardEndereco({ item: { referencia, logradouro, cep, bairro, cidade, estado, numero, complemento } }) {

    return (
        <div className='comp-card-endereco'>
            <div className='tipo'>{referencia}</div>
            <div>
                <div className='end'>{logradouro}, {numero} - {complemento}</div>
                <div className='cep'>{cep} - {bairro}, {cidade}/{estado}</div>
            </div>
        </div>
    )
}

