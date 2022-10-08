import './index.scss'

import { toast } from 'react-toastify';


import { listarCategorias } from '../../../api/admin/categoriaAPI'
import { listarDepartamentos } from '../../../api/admin/departamentoAPI'
import { useEffect, useState } from 'react'
import { alterarProduto, buscarProdutoPorId, salvarImagens, salvarProduto } from '../../../api/admin/produtoAPI';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../api/config';

export default function Produto() {
    const [idProduto, setIdProduto] = useState();
    
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [destaque, setDestaque] = useState(false);

    const [imagem1, setImagem1] = useState();
    const [imagem2, setImagem2] = useState();
    const [imagem3, setImagem3] = useState();
    const [imagem4, setImagem4] = useState();


    const [idCategoria, setIdCategoria] = useState();
    const [categorias, setCategorias] = useState([]);

    const [idDepartamento, setIdDepartamento] = useState();
    const [departamentos, setDepartamentos] = useState([]);

    const [catSelecionadas, setCatSelecionadas] = useState([]);


    const { id } = useParams();


    async function salvar() {
        try {
            const prevoProduto = Number(preco.replace(',', '.'));

            if (!id) {
                const r = await salvarProduto(nome, prevoProduto, destaque, idDepartamento, catSelecionadas);
                await salvarImagens(r.id, imagem1, imagem2, imagem3, imagem4);
    
                toast.dark('Produto cadastrado com sucesso');
            }
            else {
                await alterarProduto(id, nome, prevoProduto, destaque, idDepartamento, catSelecionadas);
                await salvarImagens(id, imagem1, imagem2, imagem3, imagem4);
    
                toast.dark('Produto alterado com sucesso');
            }

            
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }


    function buscarNomeCategoria(id) {
        const cat = categorias.find(item => item.id == id);
        return cat.categoria;
    }

    function removerCategoria(id) {
        const x = catSelecionadas.filter(item => item != id);
        setCatSelecionadas(x);
    }


    function adicionarCategoria() {
        if (!idCategoria) return;
        
        if (!catSelecionadas.find(item => item == idCategoria)) {
            const categorias = [...catSelecionadas, idCategoria];
            setCatSelecionadas(categorias);
        }
    }


    async function carregarDepartamentos() {
        const r = await listarDepartamentos();
        setDepartamentos(r);
    }


    async function carregarCategorias() {
        const r = await listarCategorias();
        setCategorias(r);
    }

    async function carregarProduto() {
        if (!id) return;

        const r = await buscarProdutoPorId(id);
        setIdProduto(r.info.id);
        setNome(r.info.produto);
        setPreco(r.info.preco.toString());
        setDestaque(r.info.destaque);
        setIdDepartamento(r.info.departamento);
        setCatSelecionadas(r.categorias);

        if (r.imagens.length > 0) {
            setImagem1(r.imagens[0]);
        }

        if (r.imagens.length > 1) {
            setImagem2(r.imagens[1]);
        }

        if (r.imagens.length > 2) {
            setImagem3(r.imagens[2]);
        }

        if (r.imagens.length > 3) {
            setImagem4(r.imagens[3]);
        }
    }


    function escolherImagem(inputId) {
        document.getElementById(inputId).click();
    }

    function exibirImagem(imagem) {
        if (imagem == undefined) {
            return '/image.svg';
        }
        else if (typeof (imagem) == 'string') {
            return `${API_URL}/${imagem}`
        }
        else {
            return URL.createObjectURL(imagem);
        }
    }



    useEffect(() => {
        carregarCategorias();
        carregarDepartamentos();
        carregarProduto();
    }, [])


    return (
        <div className='pagina-admin-produto'>
            <h1> {id ? 'Alterar Produto' : 'Novo Produto'} </h1>

            <div className='form-container'>

                <div className='form'>

                    <div>
                        <label> Produto: </label>
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                    </div>

                    <div>
                        <label> Preço: </label>
                        <input type='text' value={preco} onChange={e => setPreco(e.target.value)} />
                    </div>

                    <div>
                        <label> Destaque: </label>
                        <input type='checkbox' checked={destaque} onChange={e => setDestaque(e.target.checked)} />
                    </div>



                    <div>
                        <label>Departamento:</label>
                        <select value={idDepartamento} onChange={e => setIdDepartamento(e.target.value)}>
                            <option selected disabled hidden>Selecione</option>

                            {departamentos.map(item =>
                                <option value={item.id}> {item.departamento} </option>
                            )}
                        </select>
                    </div>



                    <div>
                        <label>Categoria:</label>
                        <div className='gpo-categoria'>
                            <select value={idCategoria} onChange={e => setIdCategoria(e.target.value)} >
                                <option selected disabled hidden>Selecione</option>

                                {categorias.map(item =>
                                    <option value={item.id}> {item.categoria} </option>
                                )}
                            </select>
                            <button onClick={adicionarCategoria} className='btn-categoria'>+</button>
                        </div>
                    </div>
                    <div>
                        <label></label>
                        <div className='cat-conteiner'>
                            {catSelecionadas.map(id =>
                                <div className='cat-selecionada' onClick={() => removerCategoria(id)}>
                                    {buscarNomeCategoria(id)}
                                </div>
                            )}
                        </div>

                    </div>



                    <div>
                        <button onClick={salvar}> Salvar </button>
                    </div>

                </div>



                <div className='image-container'>
                    
                    <div>
                        <img src={exibirImagem(imagem1)} alt="" onClick={() => escolherImagem('imagem1')} />
                        {imagem1 ? <span onClick={() => setImagem1()}>Remover</span> : ''}
                    </div>
                    <div>
                        <img src={exibirImagem(imagem2)} alt="" onClick={() => escolherImagem('imagem2')} />
                        {imagem2 ? <span onClick={() => setImagem2()}>Remover</span> : ''}
                    </div>
                    <div>
                        <img src={exibirImagem(imagem3)} alt="" onClick={() => escolherImagem('imagem3')} />
                        {imagem3 ? <span onClick={() => setImagem3()}>Remover</span> : ''}
                    </div>
                    <div>
                        <img src={exibirImagem(imagem4)} alt="" onClick={() => escolherImagem('imagem4')} />
                        {imagem4 ? <span onClick={() => setImagem4()}>Remover</span> : ''}
                    </div>
                    

                    
                    <input type='file' id='imagem1' onChange={e => setImagem1(e.target.files[0])} />
                    <input type='file' id='imagem2' onChange={e => setImagem2(e.target.files[0])} />
                    <input type='file' id='imagem3' onChange={e => setImagem3(e.target.files[0])} />
                    <input type='file' id='imagem4' onChange={e => setImagem4(e.target.files[0])} />
                </div>

                
                
            </div>
        </div>
    )
}