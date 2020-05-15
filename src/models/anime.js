import { DataTypes, Model } from 'sequelize';
import Joi from '@hapi/joi';
import sequelize from '../startup/db';
import Genre from './genre';

class Anime extends Model {}

Anime.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    seasons: DataTypes.JSON,
  },
  {
    sequelize,
    modelName: 'Anime',
  }
);

Anime.belongsToMany(Genre, { through: 'anime_genres', as: 'genres' });
Genre.belongsToMany(Anime, { through: 'anime_genres' });

export default Anime;

export const validateAnime = {
  name: Joi.string().required().min(4).max(70),
  description: Joi.string().min(10).max(1000),
  seasons: Joi.any().required(),
  genres: Joi.array().items(Joi.number()).min(1),
};
