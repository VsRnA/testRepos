import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const Premise = sequelize.define('Premises', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'premises',
    timestamps: false,
  });

  Premise.associate = (db) => {
    Premise.hasMany(db.Users, {
      foreignKey: 'premiseId',
      as: 'users',
    });
    Premise.hasOne(db.Bonuses, {
      foreignKey: 'premiseId',
      as: 'bonus',
    });
  };

  return Premise;
};
