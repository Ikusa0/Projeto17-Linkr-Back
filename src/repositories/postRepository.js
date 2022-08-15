import { connection } from "../databases/postgres.js";

export class postRepository {
    static async userExists(userId) {
        return connection.query(`SELECT * FROM users WHERE id = $1`, [userId])
    }

    static async postExists(postId) {
        return connection.query(`SELECT * FROM posts WHERE id = $1`, [postId]);
    }

    static async postData(userId, url, description) {
        return connection.query(`INSERT INTO posts ("userId",url, description) VALUES ($1, $2, $3)`, [userId, url, description])
    }

    static async getData() {
        return connection.query(`SELECT * FROM posts`)
    }

    static async getDataById(userId) {
        return connection.query(`SELECT * FROM posts WHERE "userId" = $1`, [userId])
    }

    static async deleteData(postId, userId) {
        console.log(postId,userId)
        return connection.query(`DELETE FROM posts_likes WHERE "postId" = $1 AND "userId" = $2;`, [postId,userId]) && connection.query(`DELETE FROM posts WHERE id = $1 AND "userId" = $2`, [postId,userId])
    }

    static async updateData(newDescription, postId, userId) {
        return connection.query(`UPDATE posts SET description = $1 WHERE id = $2 AND "userId" = $3`, [newDescription, postId, userId])
    } 
};