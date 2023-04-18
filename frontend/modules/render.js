import { apiEndpoint } from "../config.js";
import { fetchApi } from "./fetchApi.js";

const showTodayDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("date").value = today;
  return today;
}

const showDiaries = (data, date) => {
  if (data?.msg) {
    document.getElementById("contents").innerHTML = `
    <h2>No data.</h2>
  `;
    return;
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
        <input type="text" class="inputTitle" placeholder="untitled">
      </div>
      <div class="inputTextContainer">
        <textarea class="inputText"></textarea>
      </div>
    </form>
  `;
  const formEl = document.querySelector("form");
  formEl.onsubmit = event => {
    event.preventDefault();
    const title = formEl[1].value;
    const text = formEl[2].value;

    const data = {
      title,
      text
    };
    console.log(data);

    fetch(`${apiEndpoint}/${date}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(async res => {
      const data = await res.json();
      console.log(data);
      fetchApi();
    });
  };
}

export { showTodayDate, showDiaries, showForm };
