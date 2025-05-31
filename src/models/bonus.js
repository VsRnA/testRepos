import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const Bonus = sequelize.define('Bonuses', {
    premiseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'premises',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Bonuses',
    timestamps: false,
  });

  Bonus.associate = (db) => {
    Bonus.belongsTo(db.Premises, {
      foreignKey: 'premiseId',
    });
  };

  return Bonus;
};