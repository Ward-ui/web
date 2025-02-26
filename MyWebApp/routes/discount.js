const express = require('express');
const router = express.Router();
const { Discount } = require('./models');

// Получить все скидки
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.findAll();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавить новую скидку
router.post('/', async (req, res) => {
  try {
    const { productId, discountValue } = req.body;
    const discount = await Discount.create({ productId, discountValue });
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
