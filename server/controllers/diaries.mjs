import Diary from "../models/diary.mjs";
import { validationResult } from "express-validator";

// const getAllDiaries = async (req, res) => {
//   const Diaries = await Diary.find().sort({ updatedAt: -1 });
//   res.json(Diaries);
// }

const getDiaryByDate = async (req, res) => {
  const _date = req.params.id;
  const diary = await Diary.find({
    createdAt: {
      "$gte": new Date(`${_date}T00:00:00+09:00`),
      "$lte": new Date(`${_date}T23:59:59+09:00`)
    }
  });
  if (diary.length === 0) return res.status(404).json({ msg: "Diary Not Found" });
  res.json(diary);
}

const writeDiary = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(err);
  }

  const diary = new Diary(req.body);
  const newDiary = await diary.save();
  res.status(201).json(newDiary);
}

const updateDiary = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(err);
  }

  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const Diary = await Diary.findById(_id);

  if (Diary === null) return res.status(404).json({ msg: "Diary Not Found" });

  if (title !== undefined) Diary.title = title;
  if (description !== undefined) Diary.description = description;
  if (comment !== undefined) Diary.comment = comment;
  if (rating !== undefined) Diary.rating = rating;
  await Diary.save();
  res.json(Diary);
}

const deleteDiaryId = async (req, res) => {

  const _id = req.params.id;
  const { deletedCount } = await Diary.deleteOne({ _id });
  if (deletedCount === 0) return res.status(404).json({ msg: "Diary Not Found" });
  res.json({ "msg": "Delete succeeded." });
}

export { getDiaryByDate, writeDiary, updateDiary, deleteDiaryId };
