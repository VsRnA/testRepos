import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const IntegrationTask = sequelize.define('IntegrationTasks', {
    guid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    },
  }, {
    tableName: 'integrationTasks',
    timestamps: true,
  });

  IntegrationTask.associate = (db) => {
    IntegrationTask.belongsTo(db.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
    IntegrationTask.hasOne(db.Tasks, {
      foreignKey: 'iTaskGuid',
      sourceKey: 'guid',
      as: 'task',
    });
  };

  return IntegrationTask;
};
