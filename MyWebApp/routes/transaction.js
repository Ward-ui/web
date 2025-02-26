const express = require('express');
const router = express.Router();
const { Transaction } = require('./models');

// Получить все транзакции
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новую транзакцию
router.post('/', async (req, res) => {
  try {
    const { orderId, amount, date } = req.body;
    const transaction = await Transaction.create({ orderId, amount, date });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
