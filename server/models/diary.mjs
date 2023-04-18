import { Schema, model } from "mongoose";
const diarySchema = Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true });

const diary = model("diary", diarySchema);
export default diary;
