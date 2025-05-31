import { DataTypes } from 'sequelize';

export default async (sequelize) => {
  const PremiseTask = sequelize.define('PremiseTasks', {
    premiseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'premises',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    taskGuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'guid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
  }, {
    tableName: 'PremiseTasks',
    timestamps: false,
  });

  PremiseTask.associate = (db) => {
    PremiseTask.belongsTo(db.Premises, {
      foreignKey: 'premiseId',
      as: 'premise',
    });

    PremiseTask.belongsTo(db.Tasks, {
      foreignKey: 'taskGuid',
      targetKey: 'guid',
      as: 'task',
    });
  };

  return PremiseTask;
};

