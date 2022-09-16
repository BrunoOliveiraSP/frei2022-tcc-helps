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


select * from tb_categoria;

select * from tb_departamento;





