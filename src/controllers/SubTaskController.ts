import { Request, Response } from "express";
import mongoose from "mongoose";
import validObjectId from "../fns/validObjectId.js";
import SubTask from "../models/SubTask.js";
import Task from "../models/Task.js";

const ObjectId = mongoose.Types.ObjectId;

async function create(req: Request, res: Response) {
  const { title, taskId } = req.body;

  if (!(title && taskId)) {
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

  const newSubTask = new SubTask({
    title,
    taskId: task._id,
    done: false,
  });
  return res.send(await newSubTask.save());
}

async function getAll(req: Request, res: Response) {
  const taskId = req.params.taskId;

  if (!validObjectId(taskId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const subTasks = await SubTask.find({ taskId });
  return res.send(subTasks);
}

async function remove(req: Request, res: Response) {
  const subTaskId = req.params.subTaskId;

  if (!validObjectId(subTaskId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const exist = await SubTask.findOne({ _id: new ObjectId(subTaskId) });

  if (!exist) {
    return res.status(404).send({ message: "Sub Task is not exist" });
  }
  const subTask = exist;
  return res.send(await SubTask.deleteOne({ _id: subTask._id }));
}

async function switchStatus(req: Request, res: Response) {
  const subTaskId = req.params.subTaskId;

  if (!validObjectId(subTaskId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const exist = await SubTask.findOne({ _id: new ObjectId(subTaskId) });

  if (!exist) {
    return res.status(404).send({ message: "Sub Task is not exist" });
  }
  const subTask = exist;
  return res.send(await SubTask.updateOne({ _id: subTask._id }, { done: !subTask.done }));
}

export default { create, getAll, remove, switchStatus };
