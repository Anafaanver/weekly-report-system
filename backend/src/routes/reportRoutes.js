import express from "express";


import {

createReport,

getMyReports,

getAllReports,

updateReport,

deleteReport

}

from "../controllers/reportController.js";


import auth from "../middleware/authMiddleware.js";

import { allowRoles } from "../middleware/roleMiddleware.js";



const router = express.Router();



// MEMBER ONLY

router.post(
"/",
auth,
allowRoles("member"),
createReport
);



router.get(
"/my",
auth,
allowRoles("member"),
getMyReports
);





// MANAGER ONLY

router.get(
"/",
auth,
allowRoles("manager"),
getAllReports
);





router.put(
"/:id",
auth,
allowRoles("member"),
updateReport
);





router.delete(
"/:id",
auth,
allowRoles("member"),
deleteReport
);




export default router;