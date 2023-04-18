import express from "express";
import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";
import env from "dotenv";
env.config();
import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", apiRoutes);

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
