const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Получить всех клиентов
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать нового клиента
router.post('/', async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const customer = await Customer.create({ name, email, address });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
