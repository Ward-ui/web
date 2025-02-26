module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Ассоциации
  Category.hasMany(sequelize.models.Product, { foreignKey: 'categoryId' });

  return Category;
};
