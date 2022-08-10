import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usersRepository from "./../repositories/usersRepository.js";
import SessionRepository from "./../repositories/sessionRepository.js";

export async function signUp(req, res) {
  try {
    const { name, email, password, pictureUrl } = res.locals.body;
	const SALT=10;
    const hashedPassword = await bcrypt.hash(password, SALT);

    await usersRepository.createUser({ name, pictureUrl, email, password: hashedPassword  });

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

  export async function signIn(req, res) {
	try {
	  const { id, name } = res.locals.user;
  
	  await SessionRepository.updateSession(id);
  
	  const { rows } = await SessionRepository.createSession(id);
  
	  const data = { userId: id, sessionId: rows[0].id };
	  const secretKey = process.env.JWT_SECRET;
	  const expiresIn = { expiresIn: 60 };
  
	  const token = jwt.sign(data, secretKey, expiresIn);
  
	  res.status(200).send({ name, token });
	} catch (e) {
	  console.log(e);
	  res.sendStatus(500);
	}
  }