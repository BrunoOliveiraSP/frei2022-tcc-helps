import './index.scss'

import { toast } from 'react-toastify';


import { listarCategorias } from '../../../api/categoriaAPI'
import { listarDepartamentos } from '../../../api/departamentoAPI'
import { useEffect, useState } from 'react'
import { salvarImagens, salvarProduto } from '../../../api/produtoAPI';

export default function Produto() {
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


    async function salvar() {
        try {
            const prevoProduto = Number(preco.replace(',', '.'));

            const r = await salvarProduto(nome, prevoProduto, destaque, idDepartamento, catSelecionadas);
            await salvarImagens(r.id, imagem1, imagem2, imagem3, imagem4);

            toast.dark('Produto cadastrado com sucesso');
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }


    function buscarNomeCategoria(id) {
        const cat = categorias.find(item => item.id == id);
        return cat.categoria;
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


    function escolherImagem(inputId) {
        document.getElementById(inputId).click();
    }

    function exibirImagem(imagem) {
        if (imagem == undefined) {
            return '/image.svg';
        }
        else {
            return URL.createObjectURL(imagem);
        }
    }



    useEffect(() => {
        carregarCategorias();
        carregarDepartamentos();
    }, [])


    return (
        <div className='pagina-admin-produto'>
            <h1> Novo Produto </h1>

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
                                <div className='cat-selecionada'>
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
                    <img src={exibirImagem(imagem1)} alt="" onClick={() => escolherImagem('imagem1')} />
                    <img src={exibirImagem(imagem2)} alt="" onClick={() => escolherImagem('imagem2')} />
                    <img src={exibirImagem(imagem3)} alt="" onClick={() => escolherImagem('imagem3')} />
                    <img src={exibirImagem(imagem4)} alt="" onClick={() => escolherImagem('imagem4')} />

                    <input type='file' id='imagem1' onChange={e => setImagem1(e.target.files[0])} />
                    <input type='file' id='imagem2' onChange={e => setImagem2(e.target.files[0])} />
                    <input type='file' id='imagem3' onChange={e => setImagem3(e.target.files[0])} />
                    <input type='file' id='imagem4' onChange={e => setImagem4(e.target.files[0])} />
                </div>

                
                
            </div>
        </div>
    )
}