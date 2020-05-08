import { DataTypes, Model } from 'sequelize';
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

Anime.belongsToMany(Genre, { through: 'anime_genres' });
Genre.belongsToMany(Anime, { through: 'anime_genres' });

export default Anime;
