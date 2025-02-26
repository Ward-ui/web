const express = require('express');
const router = express.Router();
const { Shipment } = require('./models');

// Получить все отправки
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новую отправку
router.post('/', async (req, res) => {
  try {
    const { orderId, addressId, date } = req.body;
    const shipment = await Shipment.create({ orderId, addressId, date });
    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
