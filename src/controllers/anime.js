export default function (server) {
  server.route({
    path: '/anime',
    method: 'GET',
    handler: (request, h) => {
      return h.response('hello world!').code(200);
    },
  });
}
