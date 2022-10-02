import './index.scss'


export default function ConsultarProduto() {


    return (
        <div className='pagina-admin-consultar-produto'>
            <h1> Catálogo de Produtos </h1>

            <div className='form'>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Destaque</th>
                            <th>Departamento</th>
                            <th>Qtd. Categorias</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>Livro</td>
                            <td>R$ 5,00</td>
                            <td>Sim</td>
                            <td>Fantasia</td>
                            <td>03</td>
                            <td><span>Editar</span></td>
                            <td><span>Remover</span></td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>Livro</td>
                            <td>R$ 5,00</td>
                            <td>Sim</td>
                            <td>Fantasia</td>
                            <td>03</td>
                            <td><span>Editar</span></td>
                            <td><span>Remover</span></td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>Livro</td>
                            <td>R$ 5,00</td>
                            <td>Sim</td>
                            <td>Fantasia</td>
                            <td>03</td>
                            <td><span>Editar</span></td>
                            <td><span>Remover</span></td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>Livro</td>
                            <td>R$ 5,00</td>
                            <td>Sim</td>
                            <td>Fantasia</td>
                            <td>03</td>
                            <td><span>Editar</span></td>
                            <td><span>Remover</span></td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    )
}