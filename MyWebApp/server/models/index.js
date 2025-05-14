const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Подключение к базе данных
const sequelize = new Sequelize('mysql://ISPr24-39_SevrukovKU:ISPr24-39_SevrukovKU@cfif31.ru:3306/ISPr24-39_SevrukovKU_Diplom', {
    logging: false
});

// Загружаем модели динамически
const models = {};
const modelsPath = path.join(__dirname, '.'); // Путь к папке с моделями

fs.readdirSync(modelsPath)
    .filter(file => file.endsWith('.js') && file !== 'index.js') // Исключаем файл index.js
    .forEach(file => {
        try {
            const model = require(path.join(modelsPath, file))(sequelize, DataTypes);
            models[model.name] = model;
            console.log(`Модель ${model.name} загружена`);
            console.log(Object.keys(models)); // Должен содержать 'OrderItem'
        } catch (error) {
            console.error(`Ошибка при загрузке модели ${file}:`, error);
        }
    });

// Связываем модели
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
        console.log(`Ассоциации для модели ${model.name} установлены`);
    }
});


// Проверка подключения
sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных успешно!');
    })
    .catch(error => {
        console.error('Ошибка при подключении к базе данных:', error);
    });

module.exports = { sequelize, models };
