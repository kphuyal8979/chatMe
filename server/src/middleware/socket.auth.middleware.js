import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import 'dotenv/config'

export const socketAuthMiddleware = async(socket,next)=>{
        try {
            const token = socket.handshake.headers.cookie?.split("; ").find((row)=>
                row.startsWith("jwt="))?.split("=")[1]

            if(!token){
                console.log('Socket Connection rejected:No token provided')
                return next(new Error("Unauthorized-No token Provided"))
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(!decoded){
                console.log('Socket Connection rejected:Invalid Token')
                return next(new Error("Unauthorized-Invalid Token"))

            }

            const user = await User.findById(decoded.userId).select('-password')

            if(!user){
                console.log('Socket Connection rejected: User not Found')
                return next(new Error("User Not Found"))

            }
            socket.user = user
            socket.userId = user._id.toString()

            console.log(`Socket Authenticated for user:${user.fullName} ${user._id}`)
            next()
        } catch (error) {
            console.log('Error in socket authentication',error.message)
            next(new Error('Unauthorized - Authentication failed'))
        }
}