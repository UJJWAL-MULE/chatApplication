const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connect_db = require('./db.js') 
const userRoutes = require('./routes/userRoute.js')
const messageRoutes = require('./routes/messagesRoute.js')
const socket = require('socket.io')

const app = express()
dotenv.config()

app.use(cors({
    origin: "https://chat-application-o7dx.vercel.app",
    credentials: true
  }))
app.use(express.json())

connect_db()


app.use('/api/auth',userRoutes)

app.use('/api/message',messageRoutes)

app.get('/',(req,res)=>{
  res.json({
    messsage:"successfull"
  })
})



const server = app.listen(process.env.port,()=>{
  console.log(`running in port ${process.env.port}`)
})

const io = socket(server, {
  cors: {
    origin: "https://chat-application-o7dx.vercel.app",
    credentials: true,
  }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
