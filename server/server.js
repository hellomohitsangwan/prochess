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
app.use(corsMiddleware);
app.use("/api/users", userRoutes);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  socket.on("join_room", (data)=>{
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on("send_update", (data)=>{
    if (data.obj.update !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
      socket.to(data.obj.gameId)?.emit("receive_update", data);
    }
    
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`server started in production mode on port ${PORT}`);
});
