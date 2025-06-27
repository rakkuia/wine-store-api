const pool = require('../config/db');

const createPedido = async (pedidoData) => {
  const { cliente_id, representante_id, total, condicao_pagamento, comissao, valor_comissao, pedido_status } = pedidoData;
  const res = await pool.query(
    `INSERT INTO pedidos 
    (cliente_id, representante_id, total, condicao_pagamento, comissao, valor_comissao, pedido_status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *`,
    [cliente_id, representante_id, total, condicao_pagamento, comissao, valor_comissao, pedido_status]
  );
  return res.rows[0];
};

const updatePedido = async (id, pedidoData) => {
  const { cliente_id, representante_id, total, condicao_pagamento, comissao, valor_comissao, pedido_status } = pedidoData;
  const res = await pool.query(
    `UPDATE pedidos SET 
      cliente_id=$1, representante_id=$2, total=$3, condicao_pagamento=$4, comissao=$5, valor_comissao=$6, pedido_status=$7
      WHERE id=$8 RETURNING *`,
    [cliente_id, representante_id, total, condicao_pagamento, comissao, valor_comissao, pedido_status, id]
  );
  return res.rows[0];
};

const deletePedido = async (id) => {
  await pool.query('DELETE FROM pedidos WHERE id = $1', [id]);
};

const deleteItensByPedidoId = async (pedidoId) => {
  await pool.query('DELETE FROM pedido_itens WHERE pedido_id = $1', [pedidoId]);
};


const getAllPedidos = async () => {
  const pedidosRes = await pool.query('SELECT * FROM pedidos ORDER BY id DESC');
  const pedidos = pedidosRes.rows;

  for (const pedido of pedidos) {
    const itensRes = await pool.query('SELECT * FROM pedido_itens WHERE pedido_id = $1', [pedido.id]);
    pedido.itens = itensRes.rows;
  }

  return pedidos;
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

const getClientesByIds = async (ids) => {
  if (!ids.length) return [];
  const res = await pool.query(
    `SELECT id, nome FROM clientes WHERE id = ANY($1)`,
    [ids]
  );
  return res.rows;
};

const addItemToPedido = async (pedidoId, item) => {
  const vinho_id = item.vinhoId || item.vinho_id;
  const nome_vinho = item.nomeVinho || item.nome_vinho;
  const preco = item.preco;
  const quantidade = item.quantidade;

  const res = await pool.query(
    `INSERT INTO pedido_itens 
    (pedido_id, vinho_id, nome_vinho, preco, quantidade) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`,
    [pedidoId, vinho_id, nome_vinho, preco, quantidade]
  );
  return res.rows[0];
};

module.exports = {
  createPedido,
  getPedidoById,
  addItemToPedido,
  updatePedido,
  getAllPedidos,
  deletePedido,
  deleteItensByPedidoId,
  getClientesByIds
};