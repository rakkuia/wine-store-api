const pool = require('../config/db');

const getAllClientes = async () => {
  const res = await pool.query('SELECT * FROM clientes');
  return res.rows;
};

const getClienteById = async (id) => {
  const res = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return res.rows[0];
};

const createCliente = async (cliente) => {
  const { nome, documento, endereco, cidade, estado, representante_id, contato } = cliente;
  const res = await pool.query(
    `INSERT INTO clientes 
    (nome, documento, endereco, cidade, estado, representante_id, contato) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *`,
    [nome, documento, endereco, cidade, estado, representante_id, contato]
  );
  return res.rows[0];
};

const updateCliente = async (id, cliente) => {
  const { nome, documento, endereco, cidade, estado, representante_id, contato } = cliente;
  const res = await pool.query(
    `UPDATE clientes 
    SET nome=$1, documento=$2, endereco=$3, cidade=$4, estado=$5, representante_id=$6, contato=$7 
    WHERE id=$8 
    RETURNING *`,
    [nome, documento, endereco, cidade, estado, representante_id, contato, id]
  );
  return res.rows[0];
};

const deleteCliente = async (id) => {
  await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};