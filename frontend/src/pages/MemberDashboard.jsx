import { Link } from "react-router-dom";


export default function MemberDashboard(){


return(

<div className="min-h-screen bg-slate-100 p-8">


<h1 className="text-3xl font-bold mb-8">
Member Dashboard
</h1>



<div className="grid md:grid-cols-3 gap-6">



<Link

to="/reports"

className="bg-white rounded-xl shadow p-6 hover:shadow-lg"

>


<h2 className="text-xl font-bold mb-3">

Weekly Reports

</h2>


<p className="text-gray-600">

Create, edit and manage your weekly work reports.

</p>


</Link>






<Link

to="/projects"

className="bg-white rounded-xl shadow p-6 hover:shadow-lg"

>


<h2 className="text-xl font-bold mb-3">

Projects

</h2>


<p className="text-gray-600">

View available team projects.

</p>


</Link>






<div

className="bg-white rounded-xl shadow p-6"

>


<h2 className="text-xl font-bold mb-3">

Profile

</h2>


<p className="text-gray-600">

Manage your account details.

</p>


</div>





</div>



</div>

);


}