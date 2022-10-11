import './index.scss'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { buscarProdutoPorId } from '../../api/produtoAPI';
import { API_URL } from '../../api/config';

export default function ProdutoDetalhe() {
    const [produto, setProduto] = useState({ categorias: [], imagens: [], info: {} })
    const [imagemPrincipal, setImagemPrincipal] = useState(0);

    const { id } = useParams();


    async function carregarPagina() {
        const r = await buscarProdutoPorId(id);
        console.log(r);
        setProduto(r);
    }

    function exibirImagemPrincipal() {
        if (produto.imagens.length > 0) {
            return API_URL + '/' + produto.imagens[imagemPrincipal];
        }
        else {
            return '/produto-padrao.png';
        }
    }

    function exibirImagemProduto(imagem) {
        return API_URL + '/' + imagem;
    }


    useEffect(() => {
        carregarPagina(); 
    }, [])


    return (
        <div className='pagina-detalhe-produto'>
            <div className='produto'>

                <div className='imagens'>
                    <div className='opcoes'>
                        {produto.imagens.map((item, pos) => 
                            <img src={exibirImagemProduto(item)} onClick={() => setImagemPrincipal(pos)} />
                        )}
                    </div>
                    <div className='atual'>
                        <img src={exibirImagemPrincipal()} />
                    </div>
                </div>
                <div className='detalhes'>
                    <div className='nome'> {produto.info.produto} </div>
                    <div className='departamento'> {produto.info.nomeDepartamento} </div>
                    
                    <div className='preco-label'> PREÇO </div>
                    <div className='preco'> R$ {produto.info.preco} </div>
                    
                    <button> Adicionar ao Carrinho </button>
                </div>
                
            </div>
        </div>
    )
}

