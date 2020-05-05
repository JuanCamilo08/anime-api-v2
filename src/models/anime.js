import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../startup/db';

export default sequelize.define('animes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  creationDate: {
    type: DataTypes.DATETIME,
    defaultValue: Sequelize.NOW,
  },
  seasons: {
    type: DataTypes.JSON,
  },
});
