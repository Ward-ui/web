const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false, toDefaultValu: 'user' }
  }, {
      timestamps: true  // Отключаем автоматические поля createdAt и updatedAt
  });


  User.associate = models => {
  User.hasMany(models.Order, { foreignKey: 'userId' });
  User.hasOne(models.Cart, { foreignKey: 'userId' });
  }
  return User;
};
