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
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'partners',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Путь или URL до логотипа задачи'
    }
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

    IntegrationTask.belongsTo(db.Partners, {
      foreignKey: 'partnerId',
      as: 'partner',
    });
  };

  return IntegrationTask;
};
