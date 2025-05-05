import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define allowed origins
const allowedOrigins = [
  "http://localhost:10000", // Local development
  "https://messenger-chatapp-4.onrender.com", // Render production
];

app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies to be sent with requests
  })
);

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./Frontend/dist/index.html"));
    });
}

// Socket.io CORS configuration (update here if using Socket.IO with express)
server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
