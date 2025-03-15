const customError = require('../utils/customError');
const pool = require('./db');

class Project {
    
//create a new Project
static async create(newProject) {
       let query = `INSERT INTO projects SET ?`;
       let [result] = await pool.query(query, [newProject]);
         return {id : result.insertId, ...newProject};  
}

//find project by id
static async getProjectById(id) {
    let query = `SELECT * FROM projects WHERE id = ?`;
    let [rows] = await pool.query(query,[id]);
      if(rows.length === 0)
        throw new customError(`Project with id of ${id} is not found`, 404);
       return rows[0];
}

//find all projects
static async getAllProjects() {
    let query = `SELECT * FROM projects`;
    let [rows] = await pool.query(query);
    return rows;
}

//find project specific to a user
static async getProjectsByUserId(user_id) {
    let query = `SELECT * FROM projects WHERE user_id = ?`;
    let [rows] = await pool.query(query, [user_id]);
    if(rows.length === 0) {
        throw new customError(`There are no projects associated with user_id: ${user_id}`, 404);
    }

    return rows;
}

//update project by id using PUT 
static async updateProjectById(id, updatedProject) {
    let query = `UPDATE projects SET ? WHERE id = ?`;
    let [result] = await pool.query(query, [updatedProject, id]);
    if(result.affectedRows === 0)
        throw new customError(`Project with id of ${id} is not found`, 404);
    return {id, ...updatedProject};
}

//update is_favorite column using PATCH
static async updateIsFavoriteById(id, isFavorite) {
    let query = `UPDATe projects SET is_favorite = ? WHERE id = ?`;
    let [result] = await pool.query(query, [isFavorite, id]);
    if(result.affectedRows === 0)
        throw new customError(`Project with id of ${id} is not found`, 404);

    let updatedProject = await pool.query(`SELECT * FROM projects WHERE id = ?`, [id]);

    return updatedProject[0];
}

//delete project
static async deleteProjectById(id) {
    let query = `DELETE FROM projects WHERE id = ?`;
    let [result] = await pool.query(query, [id]);
    if(result.affectedRows === 0) {
        throw new customError(`Project with id of ${id} is not found`, 404);
    }
    return {message: `Project with id of ${id} is deleted successfully`};
}


}
module.exports = Project;