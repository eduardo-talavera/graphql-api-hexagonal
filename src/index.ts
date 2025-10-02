import { Server } from "./infrastructure/server/Server.js";

(async () => {
  const server = new Server();
  await server.start();
  console.log('Server is running at http://localhost:4000/graphql :v');
})();