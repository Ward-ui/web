const express = require('express');
const router = express.Router();
const { models } = require('../models');
const { Cart} = models;

// Получить все корзины
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новую корзину
router.post('/', async (req, res) => {
  try {
    const { userId, status } = req.body;
    const cart = await Cart.create({ userId, status });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
