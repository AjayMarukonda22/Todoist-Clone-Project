const customError = require('../utils/customError');
const pool = require('./db');


//create a new user
class User {

    static async createUser(newUSer) {
        let query = `INSERT into users SET ?`;
        let [result] = await pool.query(query, [newUSer]);

        return {id : result.insertId, ...newUSer};
    }

//get a user by id

   static async getUserById(id) {
    let query = 'SELECT * FROM users WHERE id = ?';
    let [rows] = await pool.query(query, [id]);
     
    if(rows.length === 0) {
        throw new customError(`User with id of ${id} is not found`, 404);
    }

    return rows[0];
   }

//get all users
   static async getAllUsers() {
    let query = `SELECT * FROM users`;
    let [rows] = await pool.query(query);

    return rows;
   }

//update a user by id
    static async updateUserById(id, updatedUser) {
        let query = `UPDATE users SET ? WHERE id = ?`;
        let [result] = await pool.query(query, [updatedUser, id]);

        if(result.affectedRows === 0) {
            throw new customError(`User with id of ${id} is not found`, 404);
        }

        return {id, ...updatedUser};
    }

//delete a user by id
    static async deleteUserById(id) {
       let query = `DELETE FROM users WHERE id = ?`;
       let [result] = await pool.query(query, [id]);

       if(result.affectedRows === 0) {
        throw new customError(`User with id of ${id} is not found`, 404);
       }

       return {message: `User with id of ${id} is deleted successfully`};
    }    


}
module.exports = User;






