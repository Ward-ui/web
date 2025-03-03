const address = require("./address");

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Уникальность email
      validate: {
        isEmail: true // Проверка формата email
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Customer.associate = models => {
  Customer.hasMany(models.Order, { foreignKey: 'customerId' });
  Customer.hasMany(models.Address, { foreignKey: 'customerId' });
  }
  return Customer;
};
