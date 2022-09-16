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


