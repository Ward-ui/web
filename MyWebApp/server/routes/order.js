const express = require('express');
const router = express.Router();
const { models } = require('../models'); 
const authMiddleware = require('../middleware/authmiddleware');
const { Order } = models;

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
router.post('/', authMiddleware ,async (req, res) => {
  try {
    const { orderDate, totalAmount, status, userId, customerId, discountId} = req.body;
    const order = await Order.create({ userId: req.user.id, orderDate, totalAmount, status, userId, customerId, discountId});
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
