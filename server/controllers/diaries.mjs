import Diary from "../models/diary.mjs";
import { validationResult } from "express-validator";

const getAllDiaries = async (req, res) => {
  const Diaries = await Diary.find().sort({ updatedAt: -1 });
  res.json(Diaries);
};

const getDiaryByDate = async (req, res) => {
  const _date = req.params.id;
  const diary = await Diary.findOne({
    createdAt: {
      $gte: new Date(`${_date}T00:00:00`),
      $lte: new Date(`${_date}T23:59:59`)
    }
  });
  if (diary === null) return res.status(404).json({ msg: "Diary Not Found" });
  res.json(diary);
};

const writeDiary = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(err);
  }

  const _date = req.params.id;
  const oldDiary = await Diary.findOne({
    createdAt: {
      $gte: new Date(Date.UTC(`${_date}T00:00:00`)),
      $lte: new Date(Date.UTC(`${_date}T23:59:59`))
    }
  });
  if (oldDiary !== null)
    return res.status(404).json({ msg: "Diary aleady exists." });

  const diary = new Diary(req.body);
  const newDiary = await diary.save();
  res.status(201).json(newDiary);
};

const updateDiary = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(err);
  }

  const { title, text } = req.body;
  const _date = req.params.id;
  const diary = await Diary.findOne({
    createdAt: {
      $gte: new Date(Date.UTC(`${_date}T00:00:00`)),
      $lte: new Date(Date.UTC(`${_date}T23:59:59`))
    }
  });
  console.log(diary);

  if (diary === null) return res.status(404).json({ msg: "Diary Not Found" });

  if (title !== undefined) diary.title = title;
  if (text !== undefined) diary.text = text;
  await diary.save();
  res.json(diary);
};

export { getAllDiaries, getDiaryByDate, writeDiary, updateDiary };
