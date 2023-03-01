import axios from "axios";
import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoards: () => axiosClient.get("boards"),
};

export default boardApi;
