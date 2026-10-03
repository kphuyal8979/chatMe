import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from 'cors'
import { app, server } from "./lib/socket.js";
dotenv.config();
const PORT = process.env.PORT || 3000;


const __dirname = path.resolve();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Listenting on port ${PORT}`);
  connectDB();
});
