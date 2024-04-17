require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose=require("mongoose")

const cors_proxy = require('cors-anywhere');

const PORT = process.env.PORT || 7001

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
  })
const app = express()
connectDB()

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))


//routes
app.use("/api/Usere", require("./route/routeUsets"));
app.use("/api/Posts", require("./route/routePost"));
app.use("/api/Todo", require("./route/routeTodo"));
app.use("/api/Photo", require("./route/routePhoto"));




app.get("/",(req,res)=>{
res.send("this is the home page")
})


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })

mongoose.connection.on('error', err => {
    console.log(err)
    })
