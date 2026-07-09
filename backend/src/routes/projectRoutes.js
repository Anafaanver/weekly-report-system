import express from "express";

import {

createProject,

getProjects,

updateProject,

deleteProject

}

from "../controllers/projectController.js";


import auth from "../middleware/authMiddleware.js";

import {allowRoles} from "../middleware/roleMiddleware.js";



const router = express.Router();




// Everyone logged in can view projects

router.get(

"/",

auth,

getProjects

);




// Manager only

router.post(

"/",

auth,

allowRoles("manager"),

createProject

);



router.put(

"/:id",

auth,

allowRoles("manager"),

updateProject

);



router.delete(

"/:id",

auth,

allowRoles("manager"),

deleteProject

);




export default router;