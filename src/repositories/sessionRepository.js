import connection from "./../config/database.js";

async function createSession(id) {
  const query = {
    text: `
      INSERT INTO 
        sessions("userId") 
      VALUES 
        ($1)
      RETURNING
        id;`,
    values: [id],
  };

  const result = await connection.query(query);

  return result;
}

async function getSession({ userId, sessionId }) {
  const query = {
    text: `
      SELECT
        *
      FROM
        sessions
      WHERE
        ("userId" = $1) AND (id = $2) AND ("updatedAt" IS NULL);
    `,
    values: [userId, sessionId],
  };

  const result = await connection.query(query);

  return result;
}

async function updateSession(id) {
  const query = {
    text: `
      UPDATE
        sessions
      SET
        "updatedAt" = NOW()
      WHERE
        ("userId" = $1 AND "updatedAt" IS NULL)
      RETURNING
        *;`,
    values: [id],
  };

  const result = await connection.query(query);

  return result;
}

const sessionRepository = {
  createSession,
  getSession,
  updateSession,
};

export default sessionRepository;