import { WebSocketServer } from "ws";

const PORT = 8080

const wss = new WebSocketServer({ port: PORT });
let userCount = 0 
let allSockets = []
let allRooms=[]

wss.on("connection",(socket)=>{
    console.log("New User connected");
    userCount++
    allSockets.push(socket)
    console.log(`Total users connected: ${userCount}`);

    socket.on("message",(message)=>{
        console.log(`Received message: ${message}`);
        allSockets.forEach((s) => {
            s.send(`User sent: ${message}`);
        });
    });
})