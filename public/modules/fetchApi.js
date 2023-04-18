import { apiEndpoint } from "../config.js";
import { showDiary } from "./render.js";

const getDiary = () => {
  const day = document.getElementById("date").value;
  if (!day) {
    document.getElementById("contents").innerHTML = `
    <h2>Specify a date.</h2>
  `;
    return;
  }
  fetch(`${apiEndpoint}/${day}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("contents").innerHTML = "";
      showDiary(data);
    });
};

const writeDiary = (data, apiEndpoint) => {
  fetch(apiEndpoint, {
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

const updateDiary = (data, apiEndpoint, day) => {
  fetch(`${apiEndpoint}/${day}`, {
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
