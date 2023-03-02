import axios from "axios";
import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoards: () => axiosClient.get("boards"),
  updateBoardPosition: (params) => axiosClient.put("boards", params),
};

export default boardApi;
