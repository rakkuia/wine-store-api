const pool = require('../config/db');

const getAllRepresentantes = async () => {
  const res = await pool.query('SELECT * FROM representantes');
  return res.rows;
};

const getRepresentanteById = async (id) => {
  const res = await pool.query('SELECT * FROM representantes WHERE id = $1', [id]);
  return res.rows[0];
};

const createRepresentante = async (representante) => {
  const { nome, email, telefone } = representante;
  const res = await pool.query(
    'INSERT INTO representantes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, telefone]
  );
  return res.rows[0];
};

const updateRepresentante = async (id, representante) => {
  const { nome, email, telefone } = representante;
  const res = await pool.query(
    'UPDATE representantes SET nome=$1, email=$2, telefone=$3 WHERE id=$4 RETURNING *',
    [nome, email, telefone, id]
  );
  return res.rows[0];
};

const deleteRepresentante = async (id) => {
  await pool.query('DELETE FROM representantes WHERE id = $1', [id]);
};

module.exports = {
  getAllRepresentantes,
  getRepresentanteById,
  createRepresentante,
  updateRepresentante,
  deleteRepresentante
};