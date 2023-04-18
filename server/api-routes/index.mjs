import express from "express";
import booksRouter from "./diaries.mjs";

const router = express.Router();
router.use("/diaries", booksRouter);

export default router;
