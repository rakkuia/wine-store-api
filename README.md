Vinhos
GET localhost:3000/api/vinhos
Lista todos os vinhos.
GET localhost:3000/api/vinhos/:id
Busca um vinho pelo ID.
POST localhost:3000/api/vinhos
Cria um novo vinho.
PUT localhost:3000/api/vinhos/:id
Atualiza um vinho existente.
DELETE localhost:3000/api/vinhos/:id
Remove um vinho.
Clientes
GET localhost:3000/api/clientes
Lista todos os clientes.
GET localhost:3000/api/clientes/:id
Busca um cliente pelo ID.
POST localhost:3000/api/clientes
Cria um novo cliente.
PUT localhost:3000/api/clientes/:id
Atualiza um cliente existente.
DELETE localhost:3000/api/clientes/:id
Remove um cliente.
Representantes
GET localhost:3000/api/representantes
Lista todos os representantes.
GET localhost:3000/api/representantes/:id
Busca um representante pelo ID.
POST localhost:3000/api/representantes
Cria um novo representante.
PUT localhost:3000/api/representantes/:id
Atualiza um representante existente.
DELETE localhost:3000/api/representantes/:id
Remove um representante.
Pedidos
POST localhost:3000/api/pedidos
Cria um novo pedido (com itens).
GET localhost:3000/api/pedidos/:id
Busca um pedido pelo ID (inclui itens).
Rotas
POST localhost:3000/api/rotas
Cria uma nova rota.
GET localhost:3000/api/rotas/pedido/:pedidoId
Lista rotas de um pedido específico.
Usuários
POST localhost:3000/api/usuarios
Cria um novo usuário.
POST localhost:3000/api/usuarios/login
Realiza login e retorna token JWT.