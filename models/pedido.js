const pool = require('../config/db');

const createPedido = async (pedidoData) => {
  const { cliente_id, representante_id, total, condicao_pagamento } = pedidoData;
  const res = await pool.query(
    `INSERT INTO pedidos 
    (cliente_id, representante_id, total, condicao_pagamento) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`,
    [cliente_id, representante_id, total, condicao_pagamento]
  );
  return res.rows[0];
};

const getPedidoById = async (id) => {
  const pedidoRes = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
  if (pedidoRes.rows.length === 0) return null;
  
  const itensRes = await pool.query('SELECT * FROM pedido_itens WHERE pedido_id = $1', [id]);
  return {
    ...pedidoRes.rows[0],
    itens: itensRes.rows
  };
};

const addItemToPedido = async (pedidoId, item) => {
  const { vinho_id, quantidade } = item;
  
  const vinhoRes = await pool.query('SELECT nome, preco FROM vinhos WHERE id = $1', [vinho_id]);
  if (vinhoRes.rows.length === 0) throw new Error('Vinho não encontrado');
  
  const { nome, preco } = vinhoRes.rows[0];
  
  const res = await pool.query(
    `INSERT INTO pedido_itens 
    (pedido_id, vinho_id, nome_vinho, preco, quantidade) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`,
    [pedidoId, vinho_id, nome, preco, quantidade]
  );
  return res.rows[0];
};

module.exports = {
  createPedido,
  getPedidoById,
  addItemToPedido
};