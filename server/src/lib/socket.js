import {Server} from 'socket.io'
import http from 'node:http'
import express from 'express'
import 'dotenv/config'
import { socketAuthMiddleware } from '../middleware/socket.auth.middleware.js'

const app = express()
const server = http.Server(app)


const io = new Server(server,{
    cors:{
       origin: [process.env.CLIENT_URL],
       credentials:true,
    }
})



//apply authentication middleware to all socket connection
io.use(socketAuthMiddleware)

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}
const userSocketMap = {}


io.on("connection",(socket)=>{
    console.log('A user Connected:',socket.user.fullName)


    const userId = socket.userId
    userSocketMap[userId] = socket.id



    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log('A user disconnected:',socket.user.fullName)
        delete userSocketMap[userId]
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    })
})

export {io,app,server,userSocketMap}