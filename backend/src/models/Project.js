import mongoose from "mongoose";


const projectSchema = new mongoose.Schema(

{

name:{
type:String,
required:true
},


description:{
type:String
},


status:{
type:String,
enum:[
"active",
"completed"
],
default:"active"
},


createdBy:{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

}


},

{
timestamps:true
}

);


export default mongoose.model(
"Project",
projectSchema
);