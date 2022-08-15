//Repositories
import { HashtagRepository } from "../repositories/hashtagRepository.js";

export async function getHashtags(_req, res) {
  try {
    const { rows: name } = await HashtagRepository.getHashtag();
    return res.send(name).status(200);
  } catch (error) {
    return res.send(error.message).status(500);
  }
}

export async function getHashtagById(req, res) {
  const { id } = req.params;

  try {
    const hashtagExists = await HashtagRepository.getHashtagId(id);

    if (hashtagExists.rowCount === 0) return res.sendStatus(404);

    res.send(hashtagExists).status(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
