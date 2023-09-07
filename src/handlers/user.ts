import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    const isValied = comparePasswords(req.body.password, user.password);
    if (!isValied) {
      res.status(401);
      res.json({ message: "Invalied username or password" });
      return;
    } else {
      const token = createJWT(user);
      res.json({ token });
    }
  } catch (error) {
    next(error);
  }
};
