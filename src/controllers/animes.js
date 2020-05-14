import Anime from '../models/anime';
import Genre from '../models/genre';

export default function (server) {
  server.route({
    path: '/animes',
    method: 'GET',
    handler: async (request, handler) => {
      const animes = await Anime.findAll({
        include: [{ model: Genre, as: 'genres', through: { attributes: [] } }],
      });

      return handler.response(animes).code(200);
    },
  });

  server.route({
    path: '/animes',
    method: 'POST',
    handler: async (request, handler) => {
      const { genres, ...data } = request.payload;
      const anime = await Anime.create(data);

      if (genres && genres.length > 0) {
        anime.setGenres(genres);
      }

      return handler.response(anime).code(201);
    },
  });
}
