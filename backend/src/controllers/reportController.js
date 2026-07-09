import Report from "../models/Report.js";


// CREATE REPORT (MEMBER)

export const createReport = async(req,res)=>{

try{


const report = await Report.create({

user:req.user.id,

...req.body,

status:"submitted"

});


res.status(201).json({

message:"Report created successfully",

report

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};







// GET MEMBER REPORTS

export const getMyReports = async(req,res)=>{


try{


const reports = await Report.find({

user:req.user.id

})
.populate(
"user",
"name email"
)
.sort({

createdAt:-1

});



res.json(reports);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};









// GET ALL REPORTS (MANAGER)

export const getAllReports = async(req,res)=>{


try{


const reports = await Report.find()

.populate(

"user",

"name email"

)

.sort({

createdAt:-1

});



res.json(reports);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};









// UPDATE REPORT

export const updateReport = async(req,res)=>{


try{


const report = await Report.findOne({

_id:req.params.id,

user:req.user.id

});




if(!report){


return res.status(404).json({

message:"Report not found"

});


}





Object.assign(

report,

req.body

);



await report.save();



res.json({

message:"Report updated successfully",

report

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};









// DELETE REPORT

export const deleteReport = async(req,res)=>{


try{


const report = await Report.findOneAndDelete({

_id:req.params.id,

user:req.user.id

});




if(!report){


return res.status(404).json({

message:"Report not found"

});


}





res.json({

message:"Report deleted successfully"

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};