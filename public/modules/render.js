import { apiEndpoint } from "../config.js";
import { writeDiary, updateDiary } from "./fetchApi.js";

const showTodayDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("date").value = today;
  return today;
};

const showDiary = (data, date) => {
  if (data?.msg) {
    document.getElementById("contents").innerHTML = `
    <h2>No data.</h2>
  `;
    return 0;
  }

  document.getElementById("contents").innerHTML += `
    <div class="container">
      <span class="title">${data["title"]}</span><span class="date">${date}</span>
      <p>${data["text"]}</p>
    </div>
  `;
};

const showForm = () => {
  const date = showTodayDate();
  document.getElementById("contents").innerHTML = `
    <form action="/" method="POST">
      <input type="submit" id="submit" value="Submit">
      <div class="inputTitleContainer">
        <input type="text" id="inputTitle" placeholder="untitled">
      </div>
      <div class="inputTextContainer">
        <textarea id="inputText"></textarea>
      </div>
    </form>
  `;

  const formEl = document.querySelector("form");

  // update diary if aleady exists
  fetch(`${apiEndpoint}/${date}`)
    .then(response => response.json())
    .then(data => {
      if (!data?.msg) {
        console.log(data);
        document.getElementById("inputTitle").value = data["title"];
        document.getElementById("inputText").value = data["text"];
        formEl.onsubmit = event => {
          event.preventDefault();
          const title = formEl[1].value;
          const text = formEl[2].value;

          const data = {
            title,
            text
          };
          console.log(data);
          updateDiary(data, apiEndpoint, date);
          return;
        };
      }
    });
  formEl.onsubmit = event => {
    event.preventDefault();
    const title = formEl[1].value;
    const text = formEl[2].value;

    const data = {
      title,
      text
    };
    console.log(data);
    writeDiary(data, apiEndpoint, date);
  };
};

export { showTodayDate, showDiary, showForm };
