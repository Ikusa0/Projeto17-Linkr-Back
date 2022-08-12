import SqlString from "sqlstring";

import { connection } from "../databases/postgres.js";

export class HashtagRepository{
    static async getHashtag(){  
        const teste = connection.query(`SELECT * FROM hashtags`);
        console.log(teste)
        return teste
    }

    static async getHashtagId(id){
        return connection.query(`SELECT * FROM hashtags WHERE id =${SqlString.escape(id)}`);
    }
}