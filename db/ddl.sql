use q49SX63EtI;

create table tb_departamento (
	id_departamento	   int primary key auto_increment,
    nm_departamento    varchar(200)
);

create table tb_produto (
	id_produto		int primary key auto_increment,
    id_departamento	int,
	nm_produto		varchar(200),
    vl_preco		decimal(10,2),
	dt_criacao		datetime,
    bt_destaque		boolean,
    foreign key (id_departamento) references tb_departamento (id_departamento)
);


create table tb_categoria (
	id_categoria		int primary key auto_increment,
    nm_categoria		varchar(200)
);

create table tb_produto_categoria (
	id_produto_categoria	int primary key auto_increment,
    id_categoria			int,
    id_produto				int,
    foreign key (id_categoria) references tb_categoria (id_categoria),
    foreign key (id_produto) references tb_produto (id_produto)
);


create table tb_produto_imagem (
	id_produto_imagem	    int primary key auto_increment,
    id_produto				int,
    ds_imagem   			varchar(800),
    foreign key (id_produto) references tb_produto (id_produto)
);





create table tb_usuario (
	id_usuario			int primary key auto_increment,
    nm_usuario			varchar(200),
    dt_nascimento		date,
    ds_telefone			varchar(200),
    ds_cpf				varchar(200),
    ds_genero			varchar(200)
);

create table tb_login_usuario (
	id_login_usuario	    int primary key auto_increment,
    id_usuario				int,
    ds_email	  			varchar(800),
    ds_senha	  			varchar(800),
    bt_trocar				boolean,
    cod_reset				varchar(20),
    dt_expiracao_cod		datetime,
    foreign key (id_usuario) references tb_usuario (id_usuario)
);




create table tb_usuario_endereco (
	id_usuario_endereco			int primary key auto_increment,
	id_usuario					int,
    ds_referencia               varchar(200),
    ds_cep						varchar(50),
    ds_logradouro				varchar(400),
    ds_bairro					varchar(100),
    ds_cidade					varchar(100),
    ds_estado					varchar(100),
    ds_numero					varchar(100),
    ds_complemento				varchar(200),
    foreign key (id_usuario) references tb_usuario (id_usuario)
);




create table tb_cupom (
	id_cupom			int primary key auto_increment,
    cod_cupom			varchar(200),
    vl_cupom			decimal(15,2),
    qtd_restante		int
);


create table tb_pedido (
	id_pedido			int primary key auto_increment,
    id_usuario			int,
    id_usuario_endereco	int,
    id_cupom			int,
    dt_pedido			datetime,
    cod_nota_fiscal		varchar(200),
    tp_frete			varchar(200),
    vl_frete			decimal(15,2),
    ds_status			varchar(200),
    tp_pagamento		varchar(200),
    foreign key (id_usuario) references tb_usuario (id_usuario),
    foreign key (id_usuario_endereco) references tb_usuario_endereco (id_usuario_endereco),
    foreign key (id_cupom) references tb_cupom (id_cupom)
);


create table tb_pedido_item (
	id_pedido_item		int primary key auto_increment,
    id_pedido			int,
    id_produto			int,
    qtd_itens			int,
    vl_produto			decimal(15,2),
    foreign key (id_pedido) references tb_pedido (id_pedido),
    foreign key (id_produto) references tb_produto (id_produto)
);


create table tb_pagamento_cartao (
	id_pagamento_cartao	int primary key auto_increment,
    id_pedido			int,
    nm_cartao			varchar(200),
    nr_cartao			varchar(200),
    dt_vencimento		varchar(200),
    cod_seguranca		varchar(200),
    nr_parcelas			int,
    ds_forma_pagamento	varchar(200),
    foreign key (id_pedido) references tb_pedido (id_pedido)
);