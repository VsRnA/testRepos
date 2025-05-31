import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    premiseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'premises',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.associate = (db) => {
    User.belongsTo(db.Premises, {
      foreignKey: 'premiseId',
      targetKey: 'id',
    });
    User.hasMany(db.Tasks, {
      foreignKey: 'userId',
      as: 'tasks',
    });
  };

  return User;
};
