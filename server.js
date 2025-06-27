require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const vinhoRouter = require('./routes/vinhoRoutes');
const clienteRouter = require('./routes/clienteRoutes');
const representanteRouter = require('./routes/representanteRoutes');
const pedidoRouter = require('./routes/pedidoRoutes');
const rotaRouter = require('./routes/rotaRoutes');
const usuarioRouter = require('./routes/usuarioRoutes');
const cors = require('cors'); 

app.use(cors()); 
app.use(express.json());

app.use('/api/vinhos', vinhoRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/representantes', representanteRouter);
app.use('/api/pedidos', pedidoRouter);
app.use('/api/rotas', rotaRouter);
app.use('/api/usuarios', usuarioRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});