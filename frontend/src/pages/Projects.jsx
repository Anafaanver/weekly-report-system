import {useEffect,useState} from "react";

import api from "../services/api";



export default function Projects(){


const [projects,setProjects]=useState([]);

const [name,setName]=useState("");

const [description,setDescription]=useState("");

const [editId,setEditId]=useState(null);





useEffect(()=>{

loadProjects();

},[]);





const loadProjects=async()=>{


const res =
await api.get("/projects");


setProjects(res.data);


};






const saveProject=async(e)=>{


e.preventDefault();



if(editId){


await api.put(

`/projects/${editId}`,

{
name,
description
}

);


setEditId(null);


}
else{


await api.post(

"/projects",

{
name,
description
}

);


}



setName("");

setDescription("");

loadProjects();


};







const editProject=(project)=>{


setEditId(project._id);

setName(project.name);

setDescription(project.description || "");


};







const deleteProject=async(id)=>{


await api.delete(

`/projects/${id}`

);


loadProjects();


};







return(

<div className="p-8 bg-slate-100 min-h-screen">


<h1 className="text-3xl font-bold mb-8">

Projects

</h1>





<div className="bg-white p-6 rounded-xl shadow mb-8">


<form

onSubmit={saveProject}

className="space-y-4"

>


<input

className="border p-3 w-full rounded"

placeholder="Project name"

value={name}

onChange={e=>setName(e.target.value)}

required

/>




<textarea

className="border p-3 w-full rounded"

placeholder="Description"

value={description}

onChange={e=>setDescription(e.target.value)}

/>





<button

className="bg-blue-600 text-white px-6 py-3 rounded"

>

{

editId
?
"Update Project"
:
"Add Project"

}

</button>



</form>


</div>







<div className="bg-white rounded-xl shadow">


<table className="w-full">


<thead className="bg-blue-600 text-white">


<tr>

<th className="p-3">

Name

</th>


<th className="p-3">

Description

</th>


<th className="p-3">

Actions

</th>


</tr>


</thead>



<tbody>


{

projects.map(project=>(


<tr

key={project._id}

className="border-b"

>


<td className="p-3">

{project.name}

</td>



<td className="p-3">

{project.description}

</td>



<td className="p-3 space-x-3">


<button

onClick={()=>editProject(project)}

className="bg-green-600 text-white px-3 py-2 rounded"

>

Edit

</button>



<button

onClick={()=>deleteProject(project._id)}

className="bg-red-600 text-white px-3 py-2 rounded"

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