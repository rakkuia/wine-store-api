const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuario');

exports.createUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;
    const usuarioExistente = await usuarioModel.findUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }
    const novoUsuario = await usuarioModel.createUsuario({ nome, email, senha, perfil });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await usuarioModel.findUsuarioByEmail(email);
    
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email,
        perfil: usuario.perfil
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ 
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};