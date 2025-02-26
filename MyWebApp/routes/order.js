const express = require('express');
const router = express.Router();
const { Order } = require('./models');

// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый заказ
router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = await Order.create({ userId, productId, quantity });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
