import { Op } from 'sequelize';
import Joi from '@hapi/joi';
import _ from 'underscore';
import Anime, { validateAnime } from '../models/anime';
import Genre from '../models/genre';
import validateId from '../utils/validateId';

export default function (server) {
  server.route({
    path: '/animes',
    method: 'GET',
    handler: async (request, handler) => {
      const { genre, limit = 5, page = 1, ...queries } = _.pick(request.query, [
        'name',
        'description',
        'genre',
        'page',
        'limit',
      ]);

      const offset = limit * (page - 1);
      const endPage = limit * page;

      const options = {
        offset,
        limit,
        include: [
          {
            model: Genre,
            as: 'genres',
            through: {
              attributes: [],
            },
            required: true,
          },
        ],
      };

      if (genre)
        options.include[0].where = {
          name: genre,
        };

      if (queries)
        options.where = Object.entries(queries).reduce((obj, [key, value]) => {
          return { ...obj, [key]: { [Op.iRegexp]: value } };
        }, null);

      try {
        const result = {};
        const { rows, count } = await Anime.findAndCountAll(options);
        result.data = rows;
        result.current_page = page;
        result.total_animes = count - 1;
        result.has_next_page = !!(endPage < result.total_animes);
        return handler.response(result);
      } catch (err) {
        return handler.response(err.message).code(500);
      }
    },
    options: {
      validate: {
        query: {
          name: Joi.string().max(70),
          description: Joi.string().max(1000),
          genre: Joi.string().max(100),
          limit: Joi.number().min(1).max(100),
          page: Joi.number().min(1),
        },
        failAction: 'error',
      },
    },
  });

  server.route({
    path: '/animes/{id}',
    method: 'GET',
    handler: async (request, handler) => {
      try {
        const anime = await Anime.findAll({
          where: {
            id: request.params.id,
          },
          include: [
            { model: Genre, as: 'genres', through: { attributes: [] } },
          ],
        });
        if (anime.length < 1)
          return handler.response('Anime not found.').code(400);

        return handler.response(anime[0]);
      } catch (err) {
        return handler.response(err.message).code(500);
      }
    },
    options: {
      validate: {
        params: validateId,
        failAction: 'error',
      },
    },
  });

  server.route({
    path: '/animes',
    method: 'POST',
    handler: async (request, handler) => {
      try {
        const { genres, ...data } = request.payload;
        const anime = await Anime.create(data);

        if (genres && genres.length > 0) {
          anime.setGenres(genres);
        }

        return handler.response(anime).code(201);
      } catch (err) {
        return handler.response(err.message).code(500);
      }
    },
  });

  server.route({
    path: '/animes/{id}',
    method: 'PUT',
    handler: async (request, handler) => {
      try {
        const anime = await Anime.update(request.payload, {
          where: { id: request.params.id },
        });
        if (!anime[0]) return handler.response('Anime not found.').code(400);

        return handler.response('The anime has been updated!');
      } catch (err) {
        return handler.response(err.message).code(500);
      }
    },
    options: {
      validate: {
        payload: validateAnime,
        params: validateId,
        failAction: 'error',
      },
    },
  });

  server.route({
    path: '/animes/{id}',
    method: 'DELETE',
    handler: async (request, handler) => {
      try {
        const anime = await Anime.destroy({
          where: { id: request.params.id },
        });
        if (!anime) return handler.response('Anime not found.').code(400);

        return handler.response('the anime has been deleted!');
      } catch (err) {
        return handler.response(err.message).code(500);
      }
    },
    options: {
      validate: {
        params: validateId,
        failAction: 'error',
      },
    },
  });
}
