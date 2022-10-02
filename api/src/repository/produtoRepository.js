import { con } from "./connection.js";


export async function salvarProduto(produto) {
    const comando = `
        insert into tb_produto (id_departamento, nm_produto, vl_preco, dt_criacao, bt_destaque)
                        values (?, ?, ?, ?, ?)
    `

    const dataAtual = new Date();
    const [resp] = await con.query(comando, [
                            produto.idDepartamento,
                            produto.nome,
                            produto.preco,
                            dataAtual,
                            produto.destaque
                        ])
    return resp.insertId;
}



export async function salvarProdutoCategoria(idProduto, idCategoria) {
    const comando = `
        insert into tb_produto_categoria (id_categoria, id_produto)
                                  values (?, ?)
    `

    const [resp] = await con.query(comando, [idCategoria, idProduto])
}




export async function salvarProdutoImagem(idProduto, imagemPath) {
    const comando = `
        insert into tb_produto_imagem (id_produto, ds_imagem)
                                  values (?, ?)
    `

    const [resp] = await con.query(comando, [idProduto, imagemPath])
}