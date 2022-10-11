import './index.scss'

import { useState } from 'react'

export default function ProdutoDetalhe() {


    return (
        <div className='pagina-detalhe-produto'>
            <div className='produto'>

                <div className='imagens'>
                    <div className='opcoes'>
                        <img src='/produto-padrao.png' />
                        <img src='/produto-padrao.png' />
                        <img src='/produto-padrao.png' />
                    </div>
                    <div className='atual'>
                        <img src='/produto-padrao.png' />
                    </div>
                </div>
                <div className='detalhes'>
                    <div className='nome'> Nome do Produto top aqui </div>
                    <div className='departamento'> Departamento aqui </div>
                    
                    <div className='preco-label'> PREÇO </div>
                    <div className='preco'> R$ 123,45 </div>
                    
                    <button> Adicionar ao Carrinho </button>
                </div>
                
            </div>
        </div>
    )
}

