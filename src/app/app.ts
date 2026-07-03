import { Server } from "socket.io";
import express from "express";
import { connectToPG } from "./connecions/pg.connection.js";
import { connectToRedis } from "./connecions/redis.connection.js";
import { env } from "../validate.env.js";
import { registerMiddleware } from "./feature-modules/routes/routes.js";
import { createServer } from "node:http";
import { initializeAssociation } from "./utilities/association.js";
import { initializeSocket } from "./utilities/sockets.js";


export const startServer = async () => {
  try {
    const app = express();
    await connectToRedis();

    const server = createServer(app);
    
    const ioInstance = new Server(server, {
      cors: { origin: "*" }
    });

    initializeSocket(ioInstance);
    async function clientConnect() {
      await connectToPG();
      await initializeAssociation();
    }

    registerMiddleware(app);
    void clientConnect();

    server.listen(env.PORT, () => {
      console.log(`Server running at ${env.PORT} port`);
    });

  } catch (e) {
    console.log("error", e);
    process.nextTick(() => process.exit());
  }
};