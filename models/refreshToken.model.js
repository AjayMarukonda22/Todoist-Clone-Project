const pool = require('./db');

class RefreshTokens {

    //save a new refresh token in db
    static async saveRefreshToken(userId, token) {
           let query = `INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)`;
           await pool.query(query, [userId, token]);
    }

    //get a refresh token by user id
    static async getRefreshToken(userId) {
        let query = `SELECT token FROM refresh_tokens WHERE user_id = ?`;
        let [rows] = await pool.query(query, [userId]);
        return rows.length > 0 ? rows[0].token : null;
    } 

    //delete a refresh token when user log outs
    static async deleteRefreshToken(userId) {
        let query = `DELETE FROM refresh_tokens WHERE user_id = ?`;
        await pool.query(query, [userId]);
    }

}

module.exports = RefreshTokens;