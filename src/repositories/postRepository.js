import { connection } from "../databases/postgres.js";

export class postRepository {
    static async userExists(userId) {
        return connection.query(`SELECT * FROM users WHERE id = $1`, [userId])
    }

    static async postData(userId, url, description) {
        console.log(userId, url, description)
        return connection.query(`INSERT INTO posts ("userId",url, description) VALUES ($1, $2, $3)`, [userId, url, description])
    }

    static async getData() {
        return connection.query(`SELECT * FROM posts`)
    }
};