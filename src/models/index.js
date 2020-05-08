/* eslint-disable no-unused-vars */
import './genre';
import './anime';
import sequelize from '../startup/db';

export default async function () {
  try {
    sequelize.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
}
