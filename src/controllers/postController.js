import { postRepository } from "../repositories/postRepository.js";

export async function postData(req, res) {
    const { user_id, url, description } = req.body;
    let cleanUrl = url.trim();
    try {
        await postRepository.postData(user_id, cleanUrl, description);
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error.message).status(500);
    }
}

export async function getData(_req, res) {
    try {
        const data = await postRepository.getData();
        return res.send(data.rows).status(200);
    } catch (error) {
        return res.send(error.message).status(500);
    }
}