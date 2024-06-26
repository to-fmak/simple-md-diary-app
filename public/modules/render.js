import { apiEndpoint } from "../config.js";
import { writeDiary, updateDiary, getDiary } from "./fetchApi.js";
import { onTabKey } from "./utils.js";

const showTodayDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("date").value = today;
  return today;
};

const showDiary = data => {
  if (data?.msg) {
    document.getElementById("contents").innerHTML = `
    <h2>No data.</h2>
  `;
    return;
  }

  const date = new Date(data["updatedAt"]);
  document.getElementById("contents").innerHTML += `
    <div class="contentsContainer">
      <span class="title" id="titleContent">${data["title"]}</span>
      <span class="date" id="dateContent">last updated: ${date.toLocaleString()}</span>
      <hr><p id="textContent">${marked.parse(data["text"])}</p>
    </div>
  `;
  hljs.highlightAll();
};

const showForm = () => {
  const day = document.getElementById("date").value;

  document.getElementById("contents").innerHTML = `
    <form action="/" method="POST">
      <input type="submit" class="btn" id="submit" value="Submit">
      <input type="button" class="btn" id="backBtn" value="Back">
      <div class="inputTitleContainer">
        <input type="text" class="input" id="inputTitle" placeholder="untitled" spellcheck="false">
      </div>
      <hr>
      <div class="inputTextContainer">
        <textarea class="input" id="inputText" spellcheck="false"></textarea>
      </div>
    </form>
  `;

  document.getElementById("inputText").onkeydown = function(e) {
    onTabKey(e, this);
  };

  document.getElementById("backBtn").onclick = getDiary;
  const formEl = document.querySelector("form");

  // update diary if aleady exists
  fetch(`${apiEndpoint}/${day}`)
    .then(response => response.json())
    .then(data => {
      if (!data?.msg) {
        console.log(data);
        document.getElementById("inputTitle").value = data["title"];
        document.getElementById("inputText").value = data["text"];
        formEl.onsubmit = event => {
          event.preventDefault();
          const title = formEl[2].value;
          const text = formEl[3].value;

          const data = {
            title,
            text
          };
          console.log(data);
          updateDiary(data, apiEndpoint, day);
          return;
        };
      }
    });
  formEl.onsubmit = event => {
    event.preventDefault();
    const title = formEl[2].value;
    const text = formEl[3].value;

    const data = {
      title,
      text,
      day
    };
    console.log(data);
    writeDiary(data, apiEndpoint);
  };
};

export { showTodayDate, showDiary, showForm };
