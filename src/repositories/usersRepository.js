import bcrypt from 'bcrypt';
import connection from '../databases/postgres.js';

async function createUser(username, email, plainPassword,pictureUrl) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(plainPassword, SALT);
    return connection.query(`
      INSERT INTO users (username, email, password,pictureUrl) 
      VALUES ($1, $2, $3, $4)`, 
      [username, email, passwordHash,pictureUrl]);
  }

  async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
  }
  
  async function getUserById(id) {
    return connection.query(`SELECT * FROM users WHERE id = $1 `, [id]);
  }
  
  const usersRepository = {
    createUser,
    getUserById,
    getUserByEmail
  };
  
  export default usersRepository;