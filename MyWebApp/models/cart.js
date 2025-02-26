module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  });

  // Ассоциации
  Cart.belongsTo(sequelize.models.User, { foreignKey: 'userId' });
  Cart.hasMany(sequelize.models.OrderItem, { foreignKey: 'cartId' });

  return Cart;
};
