const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { userController } = require("./controller/user.routes");
const { authentication } = require("./Auth_Middleware/authentication");
const { twitController } = require("./controller/twit.router");
require("dotenv").config();



app.use(cors())
app.use(express.json());


app.use("/user",userController)

app.use(authentication)

app.use("/twits",twitController)

app.get("/",async(req,res)=>{
    res.send("homepage")
})



app.listen(process.env.port || 8080 ,async()=>{
    try{
     await connection;
     console.log("App is connected to mongo")
    }catch(err){
        console.log(err);
    }
    console.log("App is runnign on port 8080")
})