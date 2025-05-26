import { WebSocketServer } from "ws";
const PORT = 8080
const wss = new WebSocketServer({ port: PORT });

interface User{
    socket : WebSocket,
    room : string
}

let allSockets :User[] = []

wss.on("connection",(socket)=>{
    console.log("New User connected");

    socket.on("message",(message)=>{   
        const JSONMessage = JSON.parse(message.toString())
        if(JSONMessage.type==="join"){
            console.log("User joined room",JSONMessage.payload.roomId);
            allSockets.push({
                socket:socket as unknown as WebSocket,
                room:JSONMessage.payload.roomId!
            })
        }
        else if(JSONMessage.type==="chat"){
            const currentUserRoom = allSockets.find((x)=>x.socket===socket as unknown as WebSocket)?.room
            if(currentUserRoom){
                allSockets.forEach((user)=>{
                    if(user.room===currentUserRoom){
                        user.socket.send(JSONMessage.payload.message!)
                    }
                })
            }
        }
        else{
            console.log("Unknown message type")
        }
    });

})

// -------------- SCHEMA FOR MESSAGING -------------- //

// What the user sends

// Joining a room
// {
//     "type":"join",
//     "payload":{
//         "roomId":"1234",
//     }
// }

// Send a message
// {
//     "type":"chat",
//     "payload":{
//         "message":"hi there"
//      }
// }