const pool = require('../config/db');

const getAllVinhos = async () => {
  const res = await pool.query('SELECT * FROM vinhos');
  return res.rows;
};

const getVinhoById = async (id) => {
  const res = await pool.query('SELECT * FROM vinhos WHERE id = $1', [id]);
  return res.rows[0];
};

const createVinho = async (vinho) => {
  const { nome, tipo, safra, preco, notas_degustacao, harmonizacoes, imagem } = vinho;
  const res = await pool.query(
    'INSERT INTO vinhos (nome, tipo, safra, preco, notas_degustacao, harmonizacoes, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [nome, tipo, safra, preco, notas_degustacao, harmonizacoes, imagem]
  );
  return res.rows[0];
};

const updateVinho = async (id, vinho) => {
  const { nome, tipo, safra, preco, notas_degustacao, harmonizacoes, imagem } = vinho;
  const res = await pool.query(
    'UPDATE vinhos SET nome=$1, tipo=$2, safra=$3, preco=$4, notas_degustacao=$5, harmonizacoes=$6, imagem=$7 WHERE id=$8 RETURNING *',
    [nome, tipo, safra, preco, notas_degustacao, harmonizacoes, imagem, id]
  );
  return res.rows[0];
};

const deleteVinho = async (id) => {
  await pool.query('DELETE FROM vinhos WHERE id = $1', [id]);
};

module.exports = {
  getAllVinhos,
  getVinhoById,
  createVinho,
  updateVinho,
  deleteVinho
};