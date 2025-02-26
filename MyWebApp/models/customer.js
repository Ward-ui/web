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
      unique: true
    },
    phone: {
      type: DataTypes.STRING
    }
  });

  // Ассоциации
  Customer.hasMany(sequelize.models.Order, { foreignKey: 'customerId' });
  Customer.hasMany(sequelize.models.Address, { foreignKey: 'customerId' });

  return Customer;
};
