import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

const boardSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: ObjectId, required: true },
  private: { type: Boolean, required: true },
});
const Board = model("board", boardSchema);

export default Board;
