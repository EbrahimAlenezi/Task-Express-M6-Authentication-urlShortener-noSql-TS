import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";
import { hashPasswod } from "../../utils/hashPassword";
import { generateToken } from "../../utils/jwt";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      username,
      password,
    }: {
      username: string | undefined;
      password: string | undefined;
    } = req.body;

    if (!username || !password) {
      return next({ status: 400, message: "invalid username or password" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already in use" });
    }

    const hashedPasswod = hashPasswod(password);

    const newUser = await User.create({ username, password: hashedPasswod });
    const token = generateToken(username, newUser.id);

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      username,
      password,
    }: {
      username: string | undefined;
      password: string | undefined;
    } = req.body;

    if (!username || !password) {
      return next({ status: 400, message: "invalid credentials" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return next({
        status: 400,
        message: "invaild credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next({
        status: 400,
        message: "invaild credentials",
      });
    }

    const token = generateToken(username, user.id);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
