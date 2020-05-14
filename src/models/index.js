/* eslint-disable no-unused-vars */
import './genre';
import './anime';
import sequelize from '../startup/db';

export default async function () {
  try {
    sequelize.sync();
  } catch (err) {
    console.error(err);
  }
}
