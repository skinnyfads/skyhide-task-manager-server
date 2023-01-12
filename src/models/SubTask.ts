import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

const subTaskSchema = new Schema({
  title: { type: String, required: true },
  taskId: { type: ObjectId, required: true },
  done: { type: Boolean, required: true },
});
const SubTask = model("subTask", subTaskSchema);

export default SubTask;
