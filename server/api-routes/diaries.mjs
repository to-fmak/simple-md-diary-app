import express from "express";
import { body } from "express-validator";
import {
  updateDiary,
  getAllDiaries,
  getDiaryByDate,
  writeDiary
} from "../controllers/diaries.mjs";
import requestErrorHandler from "../helpers/helper.mjs";

const router = express.Router();

router.get("/", requestErrorHandler(getAllDiaries));

router.get("/:id", requestErrorHandler(getDiaryByDate));

router.post(
  "/:id",
  body("title")
    .notEmpty()
    .withMessage("error message"),
  body("text")
    .notEmpty()
    .withMessage("error message"),
  requestErrorHandler(writeDiary)
);

router.patch(
  "/:id",
  body("title")
    .optional()
    .notEmpty(),
  body("description")
    .optional()
    .notEmpty(),
  body("comment")
    .optional()
    .notEmpty(),
  body("rating")
    .optional()
    .notEmpty()
    .isInt({ min: 1, max: 5 }),
  requestErrorHandler(updateDiary)
);

export default router;
