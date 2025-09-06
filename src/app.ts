import { Request, Response } from "express";
import express from "express";
import "dotenv/config";
import cors from "cors";
import route from "./routes";

const server = express();
server.use(express.json());

const buildServer = () => {
  server.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "First Success",
    });
  });

  server.use(
    "/api",
    cors({ credentials: true, origin: ["http://localhost:3000"] }),
    route
  );

  return server;
};

export default buildServer;
