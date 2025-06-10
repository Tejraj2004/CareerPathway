import mongoose from "mongoose";

//define structure or type of data user will give , after which clerk will store all info and generate an id for user which will be stored in backend 
//connection between react(frontend) , clerk and nodejs(database)

const userSchema = new mongoose.Schema({
    //id of string type
    _id: {type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true , unique: true},
    resume:{type:String},
    image:{type:String , required:true}
})

//use the above schema and create a user model or create a user

const User = mongoose.model('User' , userSchema)

//after creating User using above schema:the type of info to be given by user while login or sign up, export the user created so, that it can be used in some other files
export default User;