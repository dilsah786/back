const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const twitSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    category:{type:String,required:true,enum:['education', 'development', 'fun', 'sports']},
    userId :{type:String,required:true},
})


const UserModel = mongoose.model("user",userSchema);
const TwitModel = mongoose.model("twit",twitSchema);


const connection = mongoose.connect("mongodb+srv://dilsah786:dilsah786@cluster0.z3e3wgc.mongodb.net/Final_Eval")

module.exports = {connection,UserModel,TwitModel}
