import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

const taskSchema = new Schema({
  title: { type: String, required: true },
  boardId: { type: ObjectId, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});
const Task = model("task", taskSchema);

export default Task;
