import api from "./api";

const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};

const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

export default {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};