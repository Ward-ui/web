const express = require('express');
const router = express.Router();
const { models } = require('../models');
const { Cart} = models;

router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
      let cartItem = await models.Cart.findOne({ where: { userId, productId } });
      if (cartItem) {
          cartItem.quantity += quantity;
          await cartItem.save();
      } else {
          cartItem = await models.Cart.create({ userId, productId, quantity });
      }
      res.json(cartItem);
  } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удалить товар из корзины
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
      await models.Cart.destroy({ where: { userId, productId } });
      res.json({ message: 'Товар удален' });
  } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
});

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
