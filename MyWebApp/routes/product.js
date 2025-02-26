const express = require('express');
const router = express.Router();
const { Product } = require('./models');

// Получить все товары
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый товар
router.post('/', async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const product = await Product.create({ name, price, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
