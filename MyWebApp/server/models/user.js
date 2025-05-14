module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Можно сделать обязательным, если требуется
      unique: true
    },
    passwordHash: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    role: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: 'user'  // Исправление: defaultValue вместо toDefaultValu
    }
  }, {
    timestamps: true,  // Создаёт поля createdAt и updatedAt
  });

  User.associate = models => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasOne(models.Cart, { foreignKey: 'userId' });
  };

  return User;
};
