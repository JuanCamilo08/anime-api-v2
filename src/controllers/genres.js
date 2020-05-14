import Genre, { validateGenre } from '../models/genre';
import validateId from '../utils/validateId';

export default function (server) {
  server.route({
    path: '/genres',
    method: 'GET',
    handler: async (request, handler) => {
      try {
        const genres = await Genre.findAll();

        return handler.response(genres);
      } catch (err) {
        return handler.response('Something failed.').code(500);
      }
    },
  });

  server.route({
    path: '/genres',
    method: 'POST',
    handler: async (request, handler) => {
      try {
        await Genre.create(request.payload);

        return handler.response('Genre created!').code(201);
      } catch (err) {
        return handler.response(err.details[0].message).code(500);
      }
    },
    options: {
      validate: {
        payload: validateGenre,
        failAction: 'error',
      },
    },
  });

  server.route({
    path: '/genres/{id}',
    method: 'DELETE',
    handler: async (request, handler) => {
      try {
        const genre = await Genre.destroy({ where: { id: request.params.id } });
        return handler.response(genre);
      } catch (err) {
        return handler.response(err.details[0].message).code(500);
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
    path: '/genres/{id}',
    method: 'UPDATE',
    handler: async (request, handler) => {
      try {
        const genre = await Genre.update(request.payload, {
          where: { id: request.params.id },
        });

        return handler.response(genre);
      } catch (err) {
        return handler.response(err.details[0].message).code(500);
      }
    },
    options: {
      validate: {
        payload: validateGenre,
        failAction: 'error',
      },
    },
  });
}
