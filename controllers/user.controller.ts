import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { userModel } from "../models/user.model";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  /*  if (!username) {
        // throw new customError('Username is required', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json("")
    }
 */
  const userFound = await userModel.findOne({ email });
  if (userFound) {
    // throw new customError('User already exist', StatusCodes.FORBIDDEN);
    return res.status(StatusCodes.BAD_REQUEST).json("email already exists!");
  }

  const hash = await bcrypt.hash(password, 10);
  const savedUser = await new userModel({
    username,
    email,
    passwordHash: hash,
  }).save();

  if (!savedUser) {
    return res.status(StatusCodes.BAD_REQUEST).json("fail to create user!");
  }

  return res.status(200).json("user created successful")

  // Create new profile with username and email
  /*    const profile = new profileModel({
        username,
        email,
        user_id: savedUser._id,
    });
    await profile.save();
    sentNewSignupUser(email, username);
    return res.status(201).json({
        message: 'User created successfully!',
        user: savedUser,
    }); */
};

const login = (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(403).json({
      message: "Invalid credentials!",
    });
  }

  userModel
    .findOne({ email })
    .then((userFound) => {
      if (!userFound) {
        return res.status(422).json({
          message: "User not found!",
        });
      }

      bcrypt
        .compare(password, userFound.passwordHash)
        .then((compare) => {
          if (!compare) {
            return res.status(403).json({
              message: "Invalid Password!",
            });
          }

          const token = jwt.sign(
            {
              id: userFound._id,
              role: "user",
            },
            process.env.ACCESS_SECRET as string
          );
          return res.json({
            message: "Logged In successfully!",
            token,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};




export {login,register}