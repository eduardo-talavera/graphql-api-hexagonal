import { Server } from "./src/infrastructure/server/Server.js";

(async () => {
  const server = new Server();
  await server.start();
})();