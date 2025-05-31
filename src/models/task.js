import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const Task = sequelize.define('Tasks', {
    guid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    marker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    iTaskGuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'integrationTasks',
        key: 'guid',             
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'tasks',
    timestamps: true,
  });

  Task.associate = (db) => {
    Task.belongsTo(db.Users, {
      foreignKey: 'userId',
      as: 'user',
    });

    Task.belongsTo(db.IntegrationTasks, {
      foreignKey: 'iTaskGuid',
      targetKey: 'guid',
      as: 'integrationTask',
    });
  };

  return Task;
};
