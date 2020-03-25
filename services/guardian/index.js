const {Server} = require('@guardapp/server');
const routes = require('./lib/routes');
const {typeDefs, resolvers} = require('./graphql');


const server = new Server({
  serviceName: 'guardapp',
  typeDefs,
  resolvers,
  sqlOptions: true
});

routes(server);

server.listen(8080);
