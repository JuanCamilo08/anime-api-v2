import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres',
  process.env.POSTGRES_DB,
  process.env.POSTGRES_PASSWORD,
  {
    host: '0.0.0.0',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      iddle: 10000,
    },
  }
);

// console.log(models)
export default sequelize;

exports.dbInit = async function () {
  try {
    await sequelize.authenticate();
    console.log(`db on...`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
