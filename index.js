import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on("connection", (socket) => {
    socket.on("new message", (message) => {
        io.emit('message broadcast', {message: message})
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
})


server.listen(3000, ()=> {
    console.log("server listening on :3000");
})  