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

//update project by id
static async updateProjectById(id, updatedProject) {
    let query = `UPDATE projects SET ? WHERE id = ?`;
    let [result] = await pool.query(query, [updatedProject, id]);
    if(result.affectedRows === 0)
        throw new customError(`Project with id of ${id} is not found`, 404);
    return {id, ...updatedProject};
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