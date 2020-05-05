import Sequelize from 'sequelize';

export default new Sequelize(
  'postgres',
  process.env.POSTGRES_DB,
  process.env.POSTGRES_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      iddle: 10000,
    },
  }
);
