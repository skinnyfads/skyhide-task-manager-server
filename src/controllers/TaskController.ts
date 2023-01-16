import { Request, Response } from "express";
import mongoose from "mongoose";
import validObjectId from "../fns/validObjectId.js";
import Board from "../models/Board.js";
import Task from "../models/Task.js";

const ObjectId = mongoose.Types.ObjectId;

async function create(req: Request, res: Response) {
  const { title, boardId, description, status } = req.body;

  if (!(title && boardId && description && status)) {
    return res.status(400).send({ message: "Some keys is missing" });
  }
  if (!validObjectId(boardId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const exist = await Board.findOne({ _id: new ObjectId(boardId) });

  if (!exist) {
    return res.status(404).send({ message: "Board is not exist" });
  }
  const board = exist;

  const newTask = new Task({
    title,
    boardId: board._id,
    description,
    status,
  });
  return res.send(await newTask.save());
}

async function getAll(req: Request, res: Response) {
  const boardId = req.params.boardId;

  if (!validObjectId(boardId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const tasks = await Task.find({ boardId });
  return res.send(tasks);
}

async function remove(req: Request, res: Response) {
  const taskId = req.params.taskId;

  if (!validObjectId(taskId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const exist = await Task.findOne({ _id: new ObjectId(taskId) });

  if (!exist) {
    return res.status(404).send({ message: "Task is not exist" });
  }
  const task = exist;
  return res.send(await Task.deleteOne({ _id: task._id }));
}

async function changeStatus(req: Request, res: Response) {
  const taskId = req.params.taskId;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send({ message: "Some keys is missing" });
  }
  if (!validObjectId(taskId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const exist = await Task.findOne({ _id: new ObjectId(taskId) });

  if (!exist) {
    return res.status(404).send({ message: "Task is not exist" });
  }
  const task = exist;
  return res.send(await Task.updateOne({ id: task._id }, { status }));
}

export default { create, getAll, remove, changeStatus };
