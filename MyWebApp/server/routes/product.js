const express = require('express');
const router = express.Router();
const { models } = require('../models');
const { Product } = models;

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
    const { name, description, price, stockQuantity, categoryId } = req.body;
    const product = await Product.create({ name, description, price, stockQuantity, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
