import laabr from 'laabr';
import Joi from '@hapi/joi';
import animeRoutes from '../controllers/animes';
import genreRoutes from '../controllers/genres';
// eslint-disable-next-line import/named
import { dbInit } from './db';
import defineAsync from '../models/index';

const laabrOptions = {
  formats: { onPostStart: ':time :start :level :message' },
  tokens: { start: () => '[start]' },
  indent: 0,
};

export default async function (server) {
  try {
    await dbInit();
    defineAsync();

    server.validator(Joi);
    await server.register({
      plugin: laabr,
      options: laabrOptions,
    });

    animeRoutes(server);
    genreRoutes(server);

    await server.start();
    console.info(server.info.uri);
  } catch (err) {
    console.error(err.message);
  }
}
