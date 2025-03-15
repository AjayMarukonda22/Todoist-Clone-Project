const customError = require('../utils/customError');
const pool = require('./db');

class Todo {

    // Create a new todo
    static async createTodo(newTodo) {
        let query = `INSERT INTO todos SET ?`;  
        let [result] = await pool.query(query, [newTodo]);
    
        let [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [result.insertId]);
    
        return rows[0];  // Includes created_at
    }
    
    // Get all todos with filtering (project_id, is_completed, etc.)
    static async getAllTodos(queries) {

       // console.log(queries);
        let query = `SELECT * FROM todos WHERE 1=1`;
        let filters = [];

        if (queries.project_id) {
            query += ` AND project_id = ?`;
            filters.push(queries.project_id);
        }
        
        if (queries.due_date) {
            query += ` AND DATE(due_date) = ?`;
            filters.push(queries.due_date);
        }

        if (queries.is_completed !== undefined) {
            query += ` AND is_completed = ?`;
            filters.push(queries.is_completed);
        }

        if (queries.created_at) {
            query += ` AND DATE(created_at) = ?`;
            filters.push(queries.created_at);
        }

       const limit = parseInt(queries.limit) || 100;
       const offset = parseInt(queries.offset) || 0; 

       query += ` LIMIT ? OFFSET ?`;
       filters.push(limit, offset);

        let [rows] = await pool.query(query, filters);
        return rows;
    }

    // Get a todo by ID
    static async getTodoById(id) {
        let query = `SELECT * FROM todos WHERE id = ?`;
        let [rows] = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new customError(`Todo with id of ${id} is not found`, 404);
        }
        return rows[0];
    }

    // Get all todos of a specific project
    static async getTodosByProjectId(projectId) {
        let query = `SELECT * FROM todos WHERE project_id = ?`;
        let [rows] = await pool.query(query, [projectId]);
        if (rows.length === 0) {
            throw new customError(`Project with id of ${projectId} doesn't have any todos`, 404);
        }
        return rows;
    }

    // Update a todo by ID
    static async updateTodoById(id, updatedTodo) {
        let query = `UPDATE todos SET ? WHERE id = ?`;
        let [result] = await pool.query(query, [updatedTodo, id]);
        if (result.affectedRows === 0) {
            throw new customError(`Todo with id of ${id} is not found`, 404);
        }

        let [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
        return rows[0];
    }

    // Delete a todo by ID
    static async deleteTodoById(id) {
        let query = `DELETE FROM todos WHERE id = ?`;
        let [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            throw new customError(`Todo with id of ${id} is not found`, 404);
        }
        return { message: `Todo with id of ${id} is deleted successfully` };
    }
}

module.exports = Todo;
