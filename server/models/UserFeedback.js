const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    userPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Batch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suggestedForEvangadi: {
      type: DataTypes.ENUM('0','1','2','3'),  // 0-perfect, 1-good, 2-reserved, 3-currently under review
      allowNull: true,
      defaultValue: "3"
    },

    role: {
      type: DataTypes.ENUM("0", "1", "2", "3", "4"),    
      defaultValue: "0",
    },
  }, {
    timestamps: true,
  });
  return User;
};
