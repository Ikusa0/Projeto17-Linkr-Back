import { likesRepository } from "../repositories/likesRepository.js";

export async function postLike(req, res) {
    const { user_id } = req.body;
    const { id } = req.params;

    try {
        await likesRepository.postLike(user_id, parseInt(id));
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error.message).status(500);
    }
}

export async function getLikes(req, res) {
    const { id } = req.params
    const { user_id } = req.body
    try {
        const { rows: count } = await likesRepository.qtyLikes(id)
        const { rows: username } = await likesRepository.allLikes(user_id)
        const data = { count, ...{ username } }
        return res.send(data).status(200)
    } catch (error) {
        return res.send(error.message).status(500);
    }
}