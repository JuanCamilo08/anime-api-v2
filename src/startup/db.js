import Sequelize from 'sequelize';

const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env;

const sequelize = new Sequelize('postgres', POSTGRES_DB, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST || 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    iddle: 10000,
  },
});

// console.log(models)
export default sequelize;

exports.dbInit = async () => {
  try {
    await sequelize.authenticate();
    console.log(`db on...`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
