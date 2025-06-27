DROP TABLE IF EXISTS pedido_itens CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS rotas CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS representantes CASCADE;
DROP TABLE IF EXISTS vinhos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS condicoes_pagamento CASCADE;

CREATE TABLE vinhos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    safra VARCHAR(10),
    preco NUMERIC(10, 2) NOT NULL,
    notas_degustacao TEXT,
    harmonizacoes TEXT,
    imagem TEXT
);

CREATE TABLE representantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    documento VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL,
    cidade VARCHAR(50),
    estado VARCHAR(2),
    representante_id INTEGER REFERENCES representantes(id) ON DELETE SET NULL,
    contato VARCHAR(100)
);

-- CREATE TABLE condicoes_pagamento (
--     id SERIAL PRIMARY KEY,
--     descricao VARCHAR(50) UNIQUE
-- );

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    representante_id INTEGER NOT NULL REFERENCES representantes(id),
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10, 2) NOT NULL,
    comissao NUMERIC(5, 2),
    condicao_pagamento VARCHAR(50),
    valor_comissao NUMERIC(10, 2),
    pedido_status BOOLEAN DEFAULT FALSE,
);

CREATE TABLE pedido_itens (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    vinho_id INTEGER NOT NULL REFERENCES vinhos(id),
    nome_vinho VARCHAR(100),
    preco NUMERIC(10, 2),
    quantidade INTEGER NOT NULL
);

CREATE TABLE rotas (
    id SERIAL PRIMARY KEY,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL,
    pedido_id INTEGER REFERENCES pedidos(id)
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    perfil VARCHAR(20) CHECK (perfil IN ('admin', 'representante', 'institucional'))
);

-- INSERT INTO condicoes_pagamento (descricao) VALUES ('À vista'), ('30 dias'), ('60 dias'), ('Parcelado em 3x');

INSERT INTO representantes (nome, email, telefone)
VALUES ('João Vendedor', 'joao@email.com', '11999999999');
