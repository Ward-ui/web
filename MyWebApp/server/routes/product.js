const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const { models } = require('../models');
const { Product } = models;
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, File, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, File, cb) => {
    cb(null, Date.now() + path.extname(File.originalname));
  },
});

const upload = multer({ storage: storage});



// Получить все товары
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    res.status(500).json({ message: error.message });
  }
});

// Создать новый товар
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stockQuantity, categoryId } = req.body;
    
    // Проверка наличия обязательных данных
    if (!name || !price || !stockQuantity || !categoryId) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения!' });
    }

    // Создание нового товара
    const newProduct = await Product.create({ name, description, price, stockQuantity, categoryId });
    res.status(201).json(newProduct); // Возвращаем созданный товар
  } catch (error) {
    console.error('Ошибка при создании товара:', error);
    res.status(500).json({ message: 'Ошибка при добавлении товара', error: error.message });
  }
});

// Пример обработки добавления продукта с дополнительными логами
router.post('/add', upload.single('image'),async (req, res) => {
  try {
    
    const { name, description, price, stockQuantity, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-image.jpg';


    // Проверка наличия обязательных данных
    if (!name || !price || !stockQuantity || !categoryId) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения!' });
    }

    // Добавление нового продукта в базу данных
    const newProduct = await Product.create({
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      imageUrl,
    });

    res.status(201).json(newProduct); // Возвращаем созданный продукт
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error);
    res.status(500).json({ message: 'Ошибка при добавлении продукта', error: error.message });
  }
});




module.exports = router;
