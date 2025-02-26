const express = require('express');
const router = express.Router();
const { Address } = require('./models');

// Получить все адреса
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый адрес
router.post('/', async (req, res) => {
  try {
    const { street, city, postalCode, country } = req.body;
    const address = await Address.create({ street, city, postalCode, country });
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
