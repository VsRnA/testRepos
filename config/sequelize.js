import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/domesticup.sqlite',
  logging: false, 
});

export default sequelize;
