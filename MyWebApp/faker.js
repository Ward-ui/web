const faker = require('faker');
const User = require('./models/User');

// Пример генерации случайных пользователей
for (let i = 0; i < 10; i++) {
  User.create({
    username: faker.internet.userName(),
    passwordHash: faker.internet.password(),
    role: 'customer'
  }).then(() => {
    console.log('Random user added');
  });
}
