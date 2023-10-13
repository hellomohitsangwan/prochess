import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import corsMiddleware from "./cors/index.js"; 
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
connectDB();
const server = http.createServer(app);

app.use("/api/users", userRoutes);
app.use(corsMiddleware);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server started in production mode on port ${PORT}`);
});
