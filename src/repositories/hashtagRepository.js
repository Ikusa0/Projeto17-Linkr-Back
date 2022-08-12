import SqlString from "sqlstring";

import { connection } from "../databases/postgres.js";

export class HashtagRepository{
    static async getHashtag(){
        console.log("passing")
        return connection.query(` SELECT * FROM hashtags `);
    }

    static async getHashtagId(id){
        return connection.query(`SELECT * FROM hashtags WHERE id =${SqlString.escape(id)}`);
    }
}