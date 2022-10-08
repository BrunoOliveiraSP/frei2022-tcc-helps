import { con } from "./connection.js";

export async function login(email, senha) {
    const comando = `
     select tb_usuario.id_usuario		id,
            nm_usuario					nome
       from tb_usuario
       inner join tb_login_usuario on tb_login_usuario.id_usuario = tb_usuario.id_usuario
      where ds_email = ?
        and ds_senha = md5(?)
    `

    const [registros] = await con.query(comando, [email, senha]);
    return registros[0];
}



