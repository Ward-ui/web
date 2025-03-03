const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize, models } = require('./models/index'); // Подключение к базе данных и моделям
const app = express();

// Подключение рутера для авторизации
const authRoutes = require('./routes/auth');

app.use(express.json()); // Для обработки JSON данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, '../public')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});


app.use('/api/auth', authRoutes);


// Подключение роутеров для всех моделей
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const paymentRoutes = require('./routes/payment');
const shipmentRoutes = require('./routes/shipment');
const categoryRoutes = require('./routes/category');
const customerRoutes = require('./routes/customer');
const addressRoutes = require('./routes/address');
const reviewRoutes = require('./routes/review');
const cartRoutes = require('./routes/cart');
const orderItemRoutes = require('./routes/orderitem');
const supplierRoutes = require('./routes/supplier');
const stockRoutes = require('./routes/stock');
const transactionRoutes = require('./routes/transaction');
const discountRoutes = require('./routes/discount');

// Подключение маршрутов для каждого типа данных
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/discounts', discountRoutes);

// Инициализация базы данных и запуск сервера
sequelize.sync({ force: false }) // Используем { force: false } чтобы не удалять таблицы
  .then(() => {
    console.log('Подключение к базе данных и синхронизация прошли успешно!');

    // Запуск сервера после синхронизации
    app.listen(3000, () => {
      console.log('Сервер запущен на порту 3000');
    });
  })
  .catch((error) => {
    console.error('Ошибка синхронизации базы данных:', error);
  });
