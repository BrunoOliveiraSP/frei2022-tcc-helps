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



