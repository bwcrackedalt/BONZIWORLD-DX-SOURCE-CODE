import http from "node:http";
import { Server } from "socket.io";
import express from "express";
import { cookieParser } from "./utils.ts";

export const app = express();
app.use(cookieParser);
export const server = http.createServer(app);
export const io = new Server(server);
