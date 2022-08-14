import SqlString from "sqlstring";

import { connection } from "../databases/postgres.js";

export class likesRepository {
  static async userExists(userId) {
    return connection.query(`SELECT * FROM users WHERE id = $1`, [userId]);
  }

  static async postExists(postId) {
    return connection.query(`SELECT * FROM posts WHERE id =$1`, [postId]);
  }

  static async postLike(postId, userId) {
    const teste = connection.query(
      `INSERT INTO posts_likes ("postId", "userId") VALUES($1, $2)`,
      [postId, userId]
    );
    return teste
  }

  static async qtyLikes() {
    return connection.query(`SELECT COUNT(id) FROM posts_likes;`)
  }

  static async allLikes(userId){
    return connection.query(`SELECT posts_likes.id, users.username FROM posts_likes JOIN users ON users.id = $1;`,[userId])
  }
}
