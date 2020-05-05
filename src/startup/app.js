import animeRoutes from '../controllers/anime';
import db from './db';

export default async function (server) {
  try {
    await db.authenticate();
    console.log(`db on...`);

    animeRoutes(server);
    await server.start();
    console.log(`server running on ${server.info.uri}`);
  } catch (err) {
    console.error(err.message);
  }
}
