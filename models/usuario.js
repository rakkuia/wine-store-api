const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUsuario = async (usuario) => {
  const { nome, email, senha, perfil } = usuario;
  
  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);
  
  const res = await pool.query(
    `INSERT INTO usuarios 
    (nome, email, senha_hash, perfil) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, nome, email, perfil`,
    [nome, email, senhaHash, perfil]
  );
  return res.rows[0];
};

const findUsuarioByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return res.rows[0];
};

module.exports = {
  createUsuario,
  findUsuarioByEmail
};