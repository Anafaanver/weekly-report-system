import { useEffect, useState } from "react";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell
} from "recharts";


import reportService from "../services/reportService";

import DashboardCard from "../components/DashboardCard";



export default function ManagerDashboard(){


const [reports,setReports]=useState([]);

const [filteredReports,setFilteredReports]=useState([]);

const [search,setSearch]=useState("");

const [project,setProject]=useState("");





useEffect(()=>{

loadReports();

},[]);





const loadReports=async()=>{


try{


const data =
await reportService.getAllReports();


setReports(data);

setFilteredReports(data);



}
catch(error){

console.log(error);

}


};






const applyFilters=()=>{


let result=[...reports];



if(search){


result=result.filter(

r=>

r.user?.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

);


}




if(project){


result=result.filter(

r=>

r.project===project

);


}



setFilteredReports(result);



};








const totalReports =
filteredReports.length;



const submitted =
filteredReports.filter(

r=>

r.status==="submitted"

).length;





const pending =
filteredReports.filter(

r=>

r.status==="pending" ||

r.status==="draft"

).length;





const blockers =
filteredReports.filter(

r=>

r.blockers &&
r.blockers.length>0

).length;








const compliance =
totalReports===0
?
0
:
Math.round(
(submitted/totalReports)*100
);






const projectData =

Object.values(

filteredReports.reduce(

(acc,r)=>{


if(!acc[r.project]){


acc[r.project]={

name:r.project,

hours:0

};


}



acc[r.project].hours +=
r.hoursWorked || 0;



return acc;


},{}



)

);







const statusData=[

{
name:"Submitted",
value:submitted
},

{
name:"Pending",
value:pending
}

];






return(


<div className="min-h-screen bg-slate-100 p-8">



<h1 className="text-3xl font-bold mb-8">

Manager Dashboard

</h1>






<div className="grid md:grid-cols-4 gap-6 mb-8">


<DashboardCard

title="Total Reports"

value={totalReports}

/>



<DashboardCard

title="Submitted"

value={submitted}

/>



<DashboardCard

title="Pending"

value={pending}

/>



<DashboardCard

title="Open Blockers"

value={blockers}

/>



</div>








<div className="bg-white p-6 rounded-xl shadow mb-8">


<h2 className="text-xl font-bold mb-4">

Filters

</h2>



<div className="flex gap-4">



<input

className="border p-3 rounded flex-1"

placeholder="Search employee"

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>





<select

className="border p-3 rounded"

value={project}

onChange={
e=>setProject(e.target.value)
}

>


<option value="">

All Projects

</option>



{

[...new Set(

reports.map(
r=>r.project
)

)]

.map(p=>(

<option key={p}>

{p}

</option>

))


}



</select>





<button

onClick={applyFilters}

className="bg-blue-600 text-white px-5 rounded"

>

Apply

</button>




</div>


</div>










<div className="grid md:grid-cols-2 gap-8">



<div className="bg-white p-6 rounded-xl shadow">


<h2 className="font-bold text-xl mb-5">

Workload By Project

</h2>


<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={projectData}>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar dataKey="hours"/>


</BarChart>


</ResponsiveContainer>



</div>







<div className="bg-white p-6 rounded-xl shadow">


<h2 className="font-bold text-xl mb-5">

Submission Status

</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={statusData}

dataKey="value"

nameKey="name"

outerRadius={100}

>


{

statusData.map(

(entry,index)=>(

<Cell key={index}/>

)

)

}


</Pie>



<Tooltip/>


</PieChart>



</ResponsiveContainer>



</div>



</div>









<div className="bg-white mt-8 rounded-xl shadow overflow-hidden">


<h2 className="text-xl font-bold p-5">

Recent Reports

</h2>



<table className="w-full">


<thead className="bg-blue-600 text-white">


<tr>


<th className="p-3">

Employee

</th>


<th className="p-3">

Project

</th>


<th className="p-3">

Week

</th>


<th className="p-3">

Status

</th>


</tr>


</thead>



<tbody>


{

filteredReports.map(report=>(


<tr

key={report._id}

className="border-b"

>


<td className="p-3">

{report.user?.name}

</td>



<td className="p-3">

{report.project}

</td>



<td className="p-3">

{report.week}

</td>



<td className="p-3">

{report.status}

</td>



</tr>


))


}



</tbody>


</table>



</div>








<div className="mt-8 bg-white p-6 rounded-xl shadow">


<h2 className="text-xl font-bold">

Submission Compliance

</h2>


<p className="text-4xl font-bold text-blue-600 mt-3">

{compliance}%

</p>


</div>






</div>


);


}