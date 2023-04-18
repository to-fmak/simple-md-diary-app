import { fetchApi } from "./modules/fetchApi.js";
import { showTodayDate, showForm } from "./modules/render.js";

// init date
showTodayDate();
// get today's diary on load
fetchApi();

// add events
document.getElementById("date").onchange = fetchApi;

document.getElementById("writeBtn").onclick = showForm;

// const title = document.getElementById("title");
// const text = document.getElementById("text");