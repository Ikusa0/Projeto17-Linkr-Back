import { postRepository } from "../repositories/postRepository.js";

export async function validateUser(req, res, next) {
    const { user_id } = req.body;

    try {
        const { rows: userId } = await postRepository.userExists(user_id);
        if (userId.length === 0) return res.sendStatus(404);
        return next();
    } catch (error) {
        return res.sendStatus(500);
    }
}