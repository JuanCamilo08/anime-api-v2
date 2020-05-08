import { DataTypes, Model } from 'sequelize';
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
