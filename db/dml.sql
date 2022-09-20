
    insert into tb_produto (id_departamento, nm_produto, vl_preco, dt_criacao, bt_destaque)
                    values (1, 'Livro A', 10.5, '2010-05-02', true);

    insert into tb_produto_categoria (id_categoria, id_produto)
                            values (1, 1);
                            
    insert into tb_produto_categoria (id_categoria, id_produto)
                            values (2, 1);                          
