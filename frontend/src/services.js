import axios from "axios";

// create new bin
const URL = "http://localhost:3000/api/bins"; // make sure to update this with your domain! CANNOT USE LOCALHOST HERE!

async function createBin() {
  const result = await axios.post(URL);
  return result.data[0].bin_path; // returns just the bin path as a string
}

async function getRequestList(binPath) {
  const result = await axios.get(`${URL}/${binPath}/requests`);
  return result.data;
}

async function getRequest(requestId) {
  const result = await axios.get(`${URL}/requests/${requestId}`);
  return result.data;
}

function removeBinFromPath(path) {
  const relevantPathArray = path.split("/");
  const relevantPath = "/" + relevantPathArray.slice(2).join("/");

  return relevantPath;
}

function convertDbTimetoDateObj(databaseTime) {
  databaseTime =
    databaseTime.slice(0, 10) + "T" + databaseTime.slice(11, 23) + "Z";
  return new Date(databaseTime);
}

export default {
  createBin,
  getRequestList,
  getRequest,
  removeBinFromPath,
  convertDbTimetoDateObj,
};
