const date = new Date();
const yyyy = date.getFullYear();
const mm = ("0" + (date.getMonth() + 1)).slice(-2);
const dd = ("0" + date.getDate()).slice(-2);
document.getElementById("date").value = yyyy + "-" + mm + "-" + dd;

const title = document.getElementById("title");
const text = document.getElementById("text");

const showDiaries = (data, date) => {
  if (data?.msg) {
    document.getElementById("contents").innerHTML = `
    <h2>No data.</h2>
  `;
    return;
  }

  data.forEach(item => {
    document.getElementById("contents").innerHTML += `
      <div class="container">
        <span class="title">${item["title"]}</span><span class="date">${date}</span>
        <p>${item["text"]}</p>
      </div>
    `;
  });
};

const fetchApi = () => {
  const date = document.getElementById("date").value;
  if (!date) {
    document.getElementById("contents").innerHTML = `
    <h2>Specify a date.</h2>
  `;
    return;
  }
  fetch(`http://localhost:8080/api/diaries/${date}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("contents").innerHTML = "";
      showDiaries(data, date);
    });
};

fetchApi();

document.getElementById("date").onchange = fetchApi;

document.getElementById("writeBtn").onclick = () => {
  document.getElementById("date").value = yyyy + "-" + mm + "-" + dd;
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

    fetch(`http://localhost:8080/api/diaries`, {
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
};
