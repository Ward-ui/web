module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Ассоциации
  Product.belongsTo(sequelize.models.Category, { foreignKey: 'categoryId' });
  Product.hasMany(sequelize.models.OrderItem, { foreignKey: 'productId' });

  return Product;
};
