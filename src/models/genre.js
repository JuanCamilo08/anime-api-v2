import { DataTypes, Model } from 'sequelize';
import Joi from '@hapi/joi';
import sequelize from '../startup/db';

class Genre extends Model {}

Genre.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    sequelize,
    modelName: 'Genre',
  }
);

export default Genre;

export const validateGenre = {
  name: Joi.string().required().min(4).max(100),
};
