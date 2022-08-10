import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usersRepository from "./../repositories/usersRepository.js";
import SessionRepository from "./../repositories/sessionRepository.js";

export async function signUp(req, res) {

    const user = req.body;
    const SALT = 10;
    const {username, pictureUrl, email, password} = user;
    const hashedPassword = bcrypt.hashSync(password, SALT);

    try {
        
        await usersRepository.createUser(username, pictureUrl, email, hashedPassword);

        res.status(201).send("successfully register");
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    console.log("Executando SignIn");
    try {
        const {id, name} = req.locals.user;

        await SessionRepository.updateSession(id);

        const {rows} = await SessionRepository.createSession(id);

        const data = {
            userId: id,
            sessionId: rows[0].id
        };
        const secretKey = process.env.JWT_SECRET;
        const expiresIn = {
            expiresIn: 60
        };

        const token = jwt.sign(data, secretKey, expiresIn);

        res.status(200).send({name, token});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
