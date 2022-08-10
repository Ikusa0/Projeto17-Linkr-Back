import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import usersRepository from "../repositories/usersRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";

export async function validateSignUp(req, res, next) {
  const { bodySanitized } = res.locals;

  try {
    const { email } = bodySanitized;

    const result = await usersRepository.getUserByEmail(email);

    if (result.rowCount > 0) {
      return res.status(422).send({
        msg: "This email already exists.",
      });
    }

    res.locals.body = bodySanitized;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function validateSignIn(req, res, next) {
  try {
    const { email, password } = res.locals.bodySanitized;

    const result = await usersRepository.getUserByEmail(email);

    if (result.rowCount === 0) {
      return res.status(401).send({
        msg: "This user does not exist.",
      });
    }

    const user = result.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({
        msg: "Wrong password.",
      });
    }

    res.locals.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1]?.trim();

  if (!token) {
    return res.status(401).send({
      msg: "You must be logged in to do this.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({
        msg: "Invalid token provided.",
      });
    }

    const result = await sessionRepository.getSession(decoded);

    if (result.rowCount === 0) {
      return res.status(401).send({
        msg: "Invalid token provided.",
      });
    }

    res.locals.userId = result.rows[0].userId;

    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).send({
        msg: "Your session has expired.",
      });
    }

    if (e.name === "JsonWebTokenError") {
      return res.status(401).send({
        msg: "Invalid token provided.",
      });
    }

    res.sendStatus(500);
  }
}
