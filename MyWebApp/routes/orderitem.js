const express = require('express');
const router = express.Router();
const { OrderItem } = require('./models');

// Получить все элементы заказа
router.get('/', async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый элемент заказа
router.post('/', async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const orderItem = await OrderItem.create({ orderId, productId, quantity });
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
