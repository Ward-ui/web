module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING
    }
  });

  // Ассоциации
  Review.belongsTo(sequelize.models.Product, { foreignKey: 'productId' });

  return Review;
};
