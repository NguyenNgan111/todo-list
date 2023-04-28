import axios from "axios";

function CallAPI(endpoint, method = "GET", body) {
  return axios({ method: method, url: endpoint, data: body });
}
export default CallAPI;
