import mongoose from "mongoose";


const reportSchema = new mongoose.Schema(

{

    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    week:{

        type:String,

        required:true

    },



    project:{

        type:String,

        required:true

    },



    tasksCompleted:{

        type:String,

        required:true

    },



    tasksPlanned:{

        type:String,

        required:true

    },



    blockers:{

        type:String,

        default:""

    },



    hoursWorked:{

        type:Number,

        default:0

    },



    notes:{

        type:String,

        default:""

    },



    status:{

        type:String,

        enum:[

            "draft",

            "submitted",

            "pending",

            "approved"

        ],

        default:"draft"

    }


},

{

timestamps:true

}

);



export default mongoose.model(

"Report",

reportSchema

);