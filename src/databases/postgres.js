import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const productionConfig = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false,
  },
}; 

const developmentConfig = {  
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
};

const databaseConfig =
  process.env.NODE_ENV === "dev" ? developmentConfig : productionConfig;

  console.log("db connected")
  export const connection = new Pool(databaseConfig);
