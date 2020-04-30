const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({ host: 'localhost', port: '3000'});

  await server.start();
  console.log(`server running on ${server.info.uri}`);
}

init();

