import { apiEndpoint } from "../config.js";
import { showDiaries } from "./render.js";

const fetchApi = () => {
  const date = document.getElementById("date").value;
  if (!date) {
    document.getElementById("contents").innerHTML = `
    <h2>Specify a date.</h2>
  `;
    return;
  }
  fetch(`${apiEndpoint}/${date}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("contents").innerHTML = "";
      showDiaries(data, date);
    });
};

export { fetchApi };
