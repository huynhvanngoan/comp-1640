import axiosClient from "./axiosClient";

const dashBoardApi = {
  async getTotalAcademicYears() {
    const url = `academic/static/total`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getTotalFaculties() {
    const url = `faculty/static/total`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getTotalArticle() {
    const url = `article/static/total`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getTotalUser() {
    const url = `auth/static/total`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getTotalByFaculty() {
    const url = `article/static/totalbyfaculty`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getTotalByAcademic() {
    const url = `article/static/totalbyacademic`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getTotalByStatus() {
    const url = `article/static/totalbystatus`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default dashBoardApi;
