import { postRepository } from "../repositories/postRepository.js";

export async function postData(req, res) {
    const { user_id, url, description } = req.body;
    try {
        await postRepository.postData(user_id, url, description);
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

export async function getDataById(req, res) {
    const { id } = req.params;
    try {
        const data = await postRepository.getDataById(id)
        return res.send(data.rows).status(200)
    } catch (error) {
        return res.send(error.message).status(500);

    }
}

export async function deleteData(req, res) {
    const {id} = req.params;
    const {user_id} = req.body;
    console.log(id,user_id)
    try {
        await postRepository.deleteData(id,user_id);
        return res.sendStatus(200) //acho que é outro statusCode
    } catch (error) {
        return res.send(error.message).status(500);

    }
}

export async function updateData(req, res) {
    const {id} = req.params;
    const {user_id, description} = req.body;
    try {
        await postRepository.updateData(description, id, user_id);
        return res.sendStatus(200); //acho que é outro statusCode
    } catch (error) {
        return res.send(error.message).status(500);

    }
}