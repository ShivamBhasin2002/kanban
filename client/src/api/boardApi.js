import axios from "axios";
import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoards: () => axiosClient.get("boards"),
  updateBoardPosition: (params) => axiosClient.put("boards", params),
  getSingleBoard: (id) => axiosClient.get(`boards/${id}`),
  updateBoard: (id, params) => axiosClient.put(`boards/${id}`, params),
  getFavouriteBoards: () => axiosClient.get("boards/favouriteBoards"),
};

export default boardApi;
