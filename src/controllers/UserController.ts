import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import skinnyCrypt from "../fns/skinnyCrypt.js";

const skinnyCryptSecret = process.env.SKINNY_CRYPT_SECRET;

if (!skinnyCryptSecret) {
  console.log("Please provide SKINNY_CRYPT_SECRET");
  process.exit();
}

async function create(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).send({ message: "Some keys is missing" });
  }
  const exist = await User.findOne({ username });

  if (exist) {
    return res.status(409).send({ message: "User already exist" });
  }
  const newUser = new User({
    username,
    password: await bcrypt.hash(password, 10),
  });
  return res.send(await newUser.save());
}

async function remove(req: Request, res: Response) {
  const username = req.params.username;
  const exist = await User.findOne({ username });

  if (!exist) {
    return res.status(404).send({ message: "User is not exist" });
  }
  return res.send(await User.deleteOne({ username }));
}

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).send({ message: "Some keys is missing" });
  }
  const exist = await User.findOne({ username });

  if (!exist) {
    return res.status(404).send({ message: "User is not exist" });
  }
  const user = exist;
  const verified = await bcrypt.compare(password, user.password);

  if (!verified) {
    return res.status(403).send({ message: "Wrong password" });
  }
  const token = skinnyCrypt.encrypt(JSON.stringify({ username, password }), skinnyCryptSecret!);
  return res.send({ token });
}

export default { create, remove, login };
