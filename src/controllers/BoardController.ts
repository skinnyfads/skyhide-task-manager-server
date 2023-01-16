import { Request, Response } from "express";
import mongoose from "mongoose";
import validObjectId from "../fns/validObjectId.js";
import Board from "../models/Board.js";
import User from "../models/User.js";

const ObjectId = mongoose.Types.ObjectId;

async function create(req: Request, res: Response) {
  const { boardname, username } = req.body;

  if (!(boardname && username)) {
    return res.status(400).send({ message: "Some keys is missing" });
  }
  const exist = await User.findOne({ username });

  if (!exist) {
    return res.status(404).send({ message: "User is not exist" });
  }
  const user = exist;

  const newBoard = new Board({
    name: boardname,
    userId: user._id,
    private: true,
  });
  return res.send(await newBoard.save());
}

async function getAllFromPublic(req: Request, res: Response) {
  const boards = await Board.find({ private: false });
  return res.send(boards);
}

async function getAllFromSpecificUser(req: Request, res: Response) {
  const username = req.params.username;
  const exist = await User.findOne({ username });

  if (!exist) {
    return res.status(404).send({ message: "User is not exist" });
  }
  const user = exist;
  const boards = await Board.find({ userId: user._id });

  return res.send(boards);
}

async function remove(req: Request, res: Response) {
  const boardId = req.params.boardId;

  if (!validObjectId(boardId)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const exist = await Board.findOne({ _id: new ObjectId(boardId) });

  if (!exist) {
    return res.status(404).send({ message: "Board is not exist" });
  }
  const board = exist;
  return res.send(await Board.deleteOne({ _id: board._id }));
}

export default { create, getAllFromPublic, getAllFromSpecificUser, remove };
