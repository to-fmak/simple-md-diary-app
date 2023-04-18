import express from "express";
import apiRoutes from "./server/api-routes/index.mjs";
import "./server/helpers/db.mjs";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 8080;

app.disable("x-powered-by");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.status(404).json({ msg: "Page Not Found" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  res.status(500).json({ msg: "error" });
});

app.listen(port, () => console.log(`Server Start: http://localhost:${port}`));
