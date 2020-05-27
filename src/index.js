import '@babel/polyfill';
import Hapi from '@hapi/hapi';
import initializeServer from './startup/app';

const server = Hapi.server({ host: '0.0.0.0', port: '3000' });

initializeServer(server);
