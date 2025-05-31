import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const Partner = sequelize.define(
    'Partners',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      keyExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'partners',
      timestamps: true,
    }
  );

  Partner.associate = (db) => {
    Partner.hasMany(db.IntegrationTasks, {
      foreignKey: 'partnerId',
      as: 'integrationTasks',
    });
  };

  return Partner;
};
