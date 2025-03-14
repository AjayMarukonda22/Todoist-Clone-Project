const customError = require('../utils/customError');
const pool = require('./db');

class Task{

    //create a new task
    static async createTask(newTask) {
        let query = `INSERT INTO tasks SET ?`;  
        let [result] = await pool.query(query, [newTask]);
    
        let [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [result.insertId]);
    
        return rows[0];  // Includes created_at
    }
    
 
    //get all tasks
    static async getAllTasks() {
        let query = `SELECT * FROM tasks`;
        let [rows] = await pool.query(query);
        return rows;
    }

    //get task by id
    static async getTaskById(id) {
        let query = `SELECT * FROM tasks WHERE id = ?`;
        let [rows] = await pool.query(query, [id]);
        if(rows.length === 0) {
            throw new customError(`Task with id of ${id} is not found`, 404);
        }
        return rows[0];
    }

    //get all tasks of a specific project
    static async getTasksByProjectId(projectId) {
         let query = `SELECT * FROM tasks WHERE project_id = ?`;
         let [rows] = await pool.query(query, [projectId]);
         if(rows.length === 0) {
            throw new customError(`Project with id of ${projectId} doesn't have any tasks`, 404);
         }
         return rows;
    }

    //update task by id
    static async updateTaskById(id, updatedTask) {
        let query = `UPDATE tasks SET ? WHERE id = ?`;
        let [result] = await pool.query(query, [updatedTask, id]);
        if(result.affectedRows === 0) {
            throw new customError(`Task with id of ${id} is not found`, 404);
        }

        let [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`,[id]);
        return rows[0];
    }

    //delete a task by id
    static async deleteTaskById(id) {
        let query = `DELETE FROM tasks WHERE id = ?`;
        let [result] = await pool.query(query, [id]);
          if(result.affectedRows === 0) {
            throw new customError(`Task with id of ${id} is not found`, 404);
          }
          return {message : `Task with id of ${id} is deleted successfully`};
    }
}

module.exports = Task;


