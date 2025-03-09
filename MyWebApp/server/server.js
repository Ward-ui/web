const express = require('express');
const path = require('path');
const { sequelize } = require('./models/index'); // Подключение к базе данных и моделям
const morgan = require('morgan');
const app = express();

// Подключение рутера для авторизации и других моделей
const authRoutes = require('./routes/auth');
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

// Мидлвары
app.use(express.json()); // Для обработки JSON данных
app.use(express.static(path.join(__dirname, '../public'))); // Для обслуживания статических файлов
app.use(morgan('dev'));

// Маршруты для авторизации и моделей
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
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
