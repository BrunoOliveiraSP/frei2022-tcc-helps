import { con } from "./connection.js";

export async function listarCategorias() {
    const comando = `
        select id_categoria         as id,
               nm_categoria         as categoria
          from tb_categoria
    `

    const [linhas] = await con.query(comando);
    return linhas;
}




export async function buscarCategoriaPorId(id) {
    const comando = `
        select id_categoria         as id,
               nm_categoria         as categoria
          from tb_categoria
         where id_categoria = ?
    `

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

