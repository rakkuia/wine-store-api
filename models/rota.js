const pool = require('../config/db');

const createRota = async (rota) => {
  const { origem, destino, pedido_id } = rota;
  const res = await pool.query(
    `INSERT INTO rotas 
    (origem, destino, pedido_id) 
    VALUES ($1, $2, $3) 
    RETURNING *`,
    [origem, destino, pedido_id]
  );
  return res.rows[0];
};

const getRotasByPedido = async (pedidoId) => {
  const res = await pool.query('SELECT * FROM rotas WHERE pedido_id = $1', [pedidoId]);
  return res.rows;
};

module.exports = {
  createRota,
  getRotasByPedido
};