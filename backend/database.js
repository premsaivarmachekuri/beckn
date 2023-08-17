import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


// Login in
export const signUp = async (username, email, password, organization) =>{
    try {
        const data = await pool.query(
          'INSERT INTO login (username, email, password, organization) VALUES (?, ?, ?, ?)',
          [username, email, password, organization]
        );
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
      }
}

export const signIn = async (email, password) => {
    const result = await pool.query(
      `
      SELECT username, email, password, organization
      FROM login
      WHERE email = ? AND password = ?
      `,
      [email, password]
    );
    return result[0];
  };
  
  


export const getUser = async () => {
    const [rows] = await pool.query("SELECT * FROM users_projects"); 
    return rows;
};

export const getRow = async (id) => {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users_projects
    WHERE id = ?`, [id]
    ); 
    return rows[0];
};

export const addUser = async (project, project_type, project_role, organization_name, industry_domains, funnel_stages, manage, id, email) => {
  const result = await pool.query(`
  INSERT INTO users_projects (project, project_type, project_role, organization_name, industry_domains, funnel_stages, manage, id, email)
  VALUES (?,?,?,?,?,?,?,?,?)
  `, [project, project_type, project_role, organization_name, industry_domains, funnel_stages, manage, id, email]);
};


export const checkUser = async(name) => {
    const result = await pool.query(`
    SELECT project from users_projects WHERE project = ?
    `, [name])
    return result[0]
}

// Projects Dashboard

export const getProjects = async(email) => {
  const result = await pool.query(`
  SELECT * FROM users_projects WHERE email = ?`, [email])
  return result[0];
}

// Apis
export const getDetails = async(email, project_type) => {
  const result = await pool.query(`
  SELECT * FROM users_projects WHERE email = ? AND project_type = ?`, [email, project_type])
  return result[0];
}