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


export async function buscarProdutos() {
    const comando = `
        select tb_produto.id_produto        as id,
            nm_produto                      as produto,
            vl_preco                        as preco,
            bt_destaque                     as destaque,
            nm_departamento                 as departamento,
            count(nm_categoria)             as qtdCategorias
        from tb_produto 
        inner join tb_departamento on tb_produto.id_departamento = tb_departamento.id_departamento
        inner join tb_produto_categoria on tb_produto_categoria.id_produto = tb_produto.id_produto
        inner join tb_categoria on tb_categoria.id_categoria = tb_produto_categoria.id_categoria
        group 
            by tb_produto.id_produto,
                nm_produto,
                vl_preco,
                bt_destaque,
                nm_departamento
        `

    const [registros] = await con.query(comando);
    return registros;
}


