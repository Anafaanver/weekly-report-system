import { useNavigate } from "react-router-dom";


export default function Navbar(){


const navigate = useNavigate();



const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};



const user =
JSON.parse(
localStorage.getItem("user")
);



return(

<nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">


<h1 className="text-xl font-bold">

Weekly Report System

</h1>




<div className="flex items-center gap-5">


<span>

Hello {user?.name}

</span>



<button

onClick={logout}

className="bg-white text-blue-600 px-4 py-2 rounded"

>

Logout

</button>


</div>


</nav>

);


}