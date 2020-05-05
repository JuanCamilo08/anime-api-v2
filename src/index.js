import '@babel/polyfill';
import Hapi from '@hapi/hapi';
import initializeServer from './startup/app';

const server = Hapi.server({ host: 'localhost', port: '3000' });

initializeServer(server);
