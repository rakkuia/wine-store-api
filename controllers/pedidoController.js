const pedidoModel = require("../models/pedido");

exports.createPedido = async (req, res) => {
  try {
    const {
      cliente_id,
      representante_id,
      condicaoPagamento,
      comissao,
      valorComissao,
      total,
      itens,
    } = req.body;

    const pedido = await pedidoModel.createPedido({
      cliente_id,
      representante_id,
      condicao_pagamento: condicaoPagamento,
      comissao,
      valor_comissao: valorComissao,
      total,
      pedido_status: false,
    });

    for (const item of itens) {
      await pedidoModel.addItemToPedido(pedido.id, item);
    }

    const pedidoCompleto = await pedidoModel.getPedidoById(pedido.id);

    res.status(201).json(pedidoCompleto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const {
      cliente_id,
      representante_id,
      condicaoPagamento,
      comissao,
      valorComissao,
      total,
      itens,
    } = req.body;

    const pedido = await pedidoModel.updatePedido(req.params.id, {
      cliente_id,
      representante_id,
      condicao_pagamento: condicaoPagamento,
      comissao,
      valor_comissao: valorComissao,
      total,
      pedido_status,
    });

    await pedidoModel.deleteItensByPedidoId(req.params.id);
    for (const item of itens) {
      await pedidoModel.addItemToPedido(req.params.id, item);
    }

    const pedidoCompleto = await pedidoModel.getPedidoById(req.params.id);

    res.json(pedidoCompleto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    await pedidoModel.deletePedido(req.params.id);
    res.json({ message: "Pedido excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await pedidoModel.getPedidoById(req.params.id);
    if (!pedido)
      return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoModel.getAllPedidos();

    // Busca nomes dos clientes em lote para otimizar
    const clienteIds = [...new Set(pedidos.map((p) => p.cliente_id))];
    const clientesRes = await pedidoModel.getClientesByIds(clienteIds);
    const clientesMap = {};
    clientesRes.forEach((c) => {
      clientesMap[c.id] = c.nome;
    });

    const pedidosFormatados = pedidos.map((pedido) => ({
      id: pedido.id,
      cliente_id: pedido.cliente_id,
      clienteNome: clientesMap[pedido.cliente_id] || "",
      data: pedido.data,
      itens: pedido.itens,
      total: Number(pedido.total),
      representante_id: pedido.representante_id,
      comissao: Number(pedido.comissao),
      condicaoPagamento: String(pedido.condicao_pagamento),
      valorComissao: Number(pedido.valor_comissao),
      pedido_status: pedido.pedido_status,
    }));

    res.json(pedidosFormatados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
