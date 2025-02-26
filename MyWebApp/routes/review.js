const express = require('express');
const router = express.Router();
const { Review } = require('./models');

// Получить все отзывы
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый отзыв
router.post('/', async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = await Review.create({ productId, userId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
