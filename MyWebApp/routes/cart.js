const express = require('express');
const router = express.Router();
const { Cart } = require('./models');

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
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.create({ userId, productId, quantity });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
