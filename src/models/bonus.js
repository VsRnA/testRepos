import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const Bonuses = sequelize.define('Bonuses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    premiseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'premises',
        key: 'id'
      },
      onDelete: 'CASCADE',   // <- здесь опечатка
      onUpdate: 'CASCADE'
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Bonuses',
    timestamps: false
  });

  Bonuses.associate = (db) => {
    Bonuses.belongsTo(db.Premises, {
      foreignKey: 'premiseId',
    });
  };

  return Bonuses;
};
