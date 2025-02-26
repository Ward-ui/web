module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Ассоциации
  User.hasMany(sequelize.models.Order, { foreignKey: 'userId' });
  User.hasOne(sequelize.models.Cart, { foreignKey: 'userId' });

  return User;
};
