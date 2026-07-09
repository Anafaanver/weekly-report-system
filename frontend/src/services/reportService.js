import api from "./api";


// GET MY REPORTS (Member)

const getMyReports = async () => {

  const response = await api.get("/reports/my");

  return response.data;

};




// CREATE REPORT

const createReport = async (reportData) => {

  const response = await api.post(
    "/reports",
    reportData
  );

  return response.data;

};




// UPDATE REPORT

const updateReport = async (id, reportData) => {

  const response = await api.put(
    `/reports/${id}`,
    reportData
  );

  return response.data;

};




// DELETE REPORT

const deleteReport = async (id) => {

  const response = await api.delete(
    `/reports/${id}`
  );

  return response.data;

};




// GET ALL REPORTS (Manager)

const getAllReports = async () => {

  const response = await api.get(
    "/reports"
  );

  return response.data;

};




export default {

  getMyReports,

  getAllReports,

  createReport,

  updateReport,

  deleteReport

};