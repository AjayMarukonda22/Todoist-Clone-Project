const customError = require('../utils/customError');
const pool = require('./db');


class Comment {

    //create a comment
    static async createComment(newComment) {
       let query = `INSERT INTO comments SET ?`;
       let [result] = await pool.query(query, [newComment]);

       let [rows] = await pool.query(`SELECT * FROM comments WHERE id = ?`, [result.insertId]);

       return rows[0];
    }

    //get all comments
    static async getAllComments() {
        let query = `SELECT * FROM comments`;

        let [rows] = await pool.query(query);
        return rows; 
    }

    //get a comment by id
    static async getCommentById(id) {
        let query = `SELECT * FROM comments WHERE id = ?`;
        
        let [rows] = await pool.query(query, [id]);
         if(rows.length === 0) {
            throw new customError(`Comment with id of ${id} is not found`, 404);
         }

         return rows[0];
    }

    //update a comment by id
    static async updateCommentById(id, updatedComment) {
        let query = `UPDATE comments SET ? WHERE id = ?`;

        let [result] = await pool.query(query, [updatedComment, id]);
        if(result.affectedRows === 0) {
            throw new customError(`Comment with id of ${id} is not found`, 404);
        }

        return {id, ...updatedComment};
    }

    //delete a comment by id
    static async deleteCommentById(id) {
        let query = `DELETE FROM comments WHERE id = ?`;

        let [result] = await pool.query(query, [id]);
        if(result.affectedRows === 0) {
            throw new customError(`Comment with id of ${id} is not found`, 404);
        }

        return {message : `Comment with id of ${id} is deleted successfully`};
    }

}

module.exports = Comment;