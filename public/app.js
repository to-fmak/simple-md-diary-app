import { getDiary } from "./modules/fetchApi.js";
import { showTodayDate, showForm } from "./modules/render.js";

// init date
showTodayDate();
// get today's diary on load
getDiary();

// add events
document.getElementById("date").onchange = getDiary;

document.getElementById("writeBtn").onclick = showForm;

// const title = document.getElementById("title");
// const text = document.getElementById("text");
