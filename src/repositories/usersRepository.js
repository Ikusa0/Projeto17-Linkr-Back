import connection from '../databases/postgres.js';

async function createUser(username,pictureUrl,email, password ) {
    
    return connection.query(`
      INSERT INTO "users" (email, password, username, "pictureUrl") 
      VALUES ($1, $2, $3, $4)`, 
      [ email, password, username, pictureUrl]);
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