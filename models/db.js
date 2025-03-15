const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createTables = async () => {
    const connection = await pool.getConnection();
    try {

      await connection.query(
        `CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
        )`
      )
      await connection.query(
        `CREATE TABLE IF NOT EXISTS projects(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(50), 
        is_favorite BOOLEAN DEFAULT false,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`
      );

      await connection.query(
        `CREATE TABLE IF NOT EXISTS todos(
        id INT PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATE,
        is_completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        project_id INT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE)`
      );

      await connection.query(
        `CREATE TABLE IF NOT EXISTS comments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        content TEXT NOT NULL,
        project_id INT NULL,
        todo_id INT NULL,
        posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        CONSTRAINT fk_todo FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
        CHECK (project_id IS NOT NULL OR todo_id IS NOT NULL) 
        )`
      )

      console.log('Tables are created');
    }
    catch(err) {
       console.log('Error while creating tables: ', err);
    }
    finally{
         connection.release();
    }
};

createTables();
module.exports = pool;

