import { getDiary } from "./modules/fetchApi.js";
import { showTodayDate, showForm, showDiary } from "./modules/render.js";

// init date
showTodayDate();
// get today's diary on load
getDiary();

// add events
document.getElementById("date").onchange = getDiary;

document.getElementById("writeBtn").onclick = showForm;
