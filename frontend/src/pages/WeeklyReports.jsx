import { useEffect, useState } from "react";
import reportService from "../services/reportService";


export default function WeeklyReports(){


const [reports,setReports] = useState([]);

const [loading,setLoading] = useState(true);

const [editingId,setEditingId] = useState(null);



const [form,setForm] = useState({

week:"",
project:"",
tasksCompleted:"",
tasksPlanned:"",
blockers:"",
hoursWorked:"",
notes:""

});





useEffect(()=>{

loadReports();

},[]);






const loadReports = async()=>{


try{


const data =
await reportService.getMyReports();


setReports(data);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const submitReport = async(e)=>{


e.preventDefault();



try{


if(editingId){


await reportService.updateReport(

editingId,

form

);


setEditingId(null);


}

else{


await reportService.createReport({
  ...form,
  status: "submitted",
});


}



setForm({

week:"",
project:"",
tasksCompleted:"",
tasksPlanned:"",
blockers:"",
hoursWorked:"",
notes:""

});


loadReports();


}

catch(error){

console.log(error);

}


};








const editReport=(report)=>{


setEditingId(report._id);


setForm({

week:report.week || "",

project:report.project || "",

tasksCompleted:report.tasksCompleted || "",

tasksPlanned:report.tasksPlanned || "",

blockers:report.blockers || "",

hoursWorked:report.hoursWorked || "",

notes:report.notes || ""

});


};







const deleteReport=async(id)=>{


try{


await reportService.deleteReport(id);


loadReports();


}

catch(error){

console.log(error);

}


};








if(loading){


return(

<div className="p-8">

Loading reports...

</div>

);

}







return(

<div className="min-h-screen bg-slate-100 p-8">



<h1 className="text-3xl font-bold mb-8">

Weekly Reports

</h1>






<div className="bg-white shadow rounded-xl p-6 mb-8">


<h2 className="text-xl font-bold mb-5">

{
editingId
?
"Edit Report"
:
"Create Weekly Report"
}

</h2>





<form

onSubmit={submitReport}

className="space-y-4"

>



<input

name="week"

placeholder="Week / Date Range"

value={form.week}

onChange={handleChange}

className="w-full border p-3 rounded"

required

/>





<input

name="project"

placeholder="Project / Category"

value={form.project}

onChange={handleChange}

className="w-full border p-3 rounded"

required

/>





<textarea

name="tasksCompleted"

placeholder="Tasks Completed"

value={form.tasksCompleted}

onChange={handleChange}

className="w-full border p-3 rounded"

/>






<textarea

name="tasksPlanned"

placeholder="Tasks Planned For Next Week"

value={form.tasksPlanned}

onChange={handleChange}

className="w-full border p-3 rounded"

/>







<textarea

name="blockers"

placeholder="Blockers / Challenges"

value={form.blockers}

onChange={handleChange}

className="w-full border p-3 rounded"

/>







<input

type="number"

name="hoursWorked"

placeholder="Hours Worked"

value={form.hoursWorked}

onChange={handleChange}

className="w-full border p-3 rounded"

/>







<textarea

name="notes"

placeholder="Notes / Links"

value={form.notes}

onChange={handleChange}

className="w-full border p-3 rounded"

/>






<button

className="bg-blue-600 text-white px-6 py-3 rounded"

>

{

editingId

?

"Update Report"

:

"Submit Report"

}

</button>



</form>


</div>









<div className="bg-white rounded-xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-blue-600 text-white">


<tr>

<th className="p-3">
Week
</th>


<th className="p-3">
Project
</th>


<th className="p-3">
Hours
</th>


<th className="p-3">
Actions
</th>


</tr>


</thead>





<tbody>


{

reports.length===0 ?


<tr>

<td

colSpan="4"

className="text-center p-5"

>

No reports found

</td>

</tr>



:


reports.map(report=>(


<tr

key={report._id}

className="border-b"

>



<td className="p-3">

{report.week}

</td>





<td className="p-3">

{report.project}

</td>





<td className="p-3">

{report.hoursWorked}

</td>





<td className="p-3 space-x-3">



<button

onClick={()=>editReport(report)}

className="bg-green-600 text-white px-4 py-2 rounded"

>

Edit

</button>





<button

onClick={()=>deleteReport(report._id)}

className="bg-red-600 text-white px-4 py-2 rounded"

>

Delete

</button>



</td>




</tr>



))


}



</tbody>


</table>



</div>





</div>


);


}