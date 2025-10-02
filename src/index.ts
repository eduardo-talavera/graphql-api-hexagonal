import { Server } from "./infrastructure/server/Server.js";

(async () => {
  const server = new Server();
  await server.start();
})();