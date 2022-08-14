import { likesRepository } from "../repositories/likesRepository.js";

export async function validateUser(req, res, next) {
  const { user_id } = req.body;

  try {
    const { rows: userId } = await likesRepository.userExists(user_id);
    console.log(userId)
    if (userId.length === 0) return res.sendStatus(404);
    return next();
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function validatePost(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: postId } = await likesRepository.postExists(id);
    console.log(postId)
    if (postId.length === 0) return res.sendStatus(404);
    return next();
  } catch (error) {
    return res.sendStatus(500);
  }
}
