import laabr from 'laabr';
import animeRoutes from '../controllers/anime';
import genreRoutes from '../controllers/genre';
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

    await server.register({
      plugin: laabr,
      options: laabrOptions,
    });

    animeRoutes(server);
    genreRoutes(server);

    await server.start();
  } catch (err) {
    console.error(err.message);
  }
}
