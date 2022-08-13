import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usersRepository from "./../repositories/usersRepository.js";

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
    const {email, password} = req.body;
    const {rows: users} = await usersRepository.getUserByEmail(email);
    const [user] = users;
    if (!user) {
        return res.sendStatus(401);
    }
    
    try {
        if (bcrypt.compareSync(password, user.password)) {
            const expiresIn = {
                expiresIn: "1h",
            };
            const token =jwt.sign({user}, process.env.JWT_SECRET, expiresIn); ;
            return res.status(201).send({token});
          }
        
          res.sendStatus(401); 
      
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

}
