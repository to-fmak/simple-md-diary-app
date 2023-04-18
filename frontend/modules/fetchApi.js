import { apiEndpoint } from "../config.js";
import { showDiary } from "./render.js";

const getDiary = () => {
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
      showDiary(data, date);
    });
};

const writeDiary = (data, apiEndpoint, date) => {
  fetch(`${apiEndpoint}/${date}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(async res => {
    const data = await res.json();
    console.log(data);
    getDiary();
  });
};

const updateDiary = (data, apiEndpoint, date) => {
  fetch(`${apiEndpoint}/${date}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(async res => {
    const data = await res.json();
    console.log(data);
    getDiary();
  });
};

export { getDiary, writeDiary, updateDiary };
