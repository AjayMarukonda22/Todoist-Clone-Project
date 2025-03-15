const pool = require('../models/db');


const USERS_COUNT = 1000;
const PROJECTS_COUNT = 1000000;
const TODOS_COUNT = 10000000;
const BATCH_SIZE = 10000;

//insert users
async function insertUsers() {
     const connection =  await pool.getConnection();
     try {
       console.log('Inserting data into users...');
       let users = [];
       for(let i = 0 ; i < USERS_COUNT ; i++) {
            users.push([`user_${i}`, `user@${i}.com`]);
       }
        
       let query = `INSERT INTO users (name, email) VALUES ?`;
       await connection.query(query, [users]);

       console.log(`Inserted ${USERS_COUNT} users`);
     }
     catch(err) {
          console.log(`Error while inserting users:`, err);
     }
     finally{
        connection.release();
     }

}

//insert projects
async function insertProjects() {
    const connection = await pool.getConnection();
    try {
        console.log(`Inserting data into projects...`);

        await connection.query('ALTER TABLE projects DISABLE KEYS;'); //for speeding up write queries diable indexing
        //colors
        const colors = ['red', 'white', 'black', 'yellow', 'blue'];

        //users
        let [users] = await connection.query(`SELECT id FROM users`);
        let userIds = users.map((u) => u.id);
        for(let i = 0 ; i < PROJECTS_COUNT ; i += BATCH_SIZE) {
            let projects = [];
            for(let j = 0 ; j < BATCH_SIZE ; j++) {
                projects.push([
                     `project_${i}_${j}`,
                     colors[Math.floor(Math.random() * colors.length)],
                      Math.random() < 0.1,
                      userIds[Math.floor(Math.random() * userIds.length)]
                ])
            }
            let query = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ?`;
            await connection.query(query, [projects]);
             
            console.log(`Inserted ${i + BATCH_SIZE} projects`);
        }
        await connection.query('ALTER TABLE projects ENABLE KEYS');// enabling here after inserting
    }
    catch(err) {
        console.log(`Error while inserting projects:`, err);
    }
    finally{
        connection.release();
    }
}

//insert todos
async function insertTodos() {
    const connection = await pool.getConnection();
    try {
        console.log('Inserting data into Todos...');

        await connection.query('ALTER TABLE todos DISABLE KEYS');

        //projects
        const [projects] = await connection.query(`SELECT id FROM projects`);
        const projectIds = projects.map((p) => p.id);

        //due_date
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);
        const formattedDate = futureDate.toISOString().split('T')[0];

        for(let i = 0 ; i < TODOS_COUNT ; i += BATCH_SIZE) {
            let todos = [];
            for(let j = 0 ; j < BATCH_SIZE ; j++) {
                todos.push([
                    `content_${i}_${j}`,
                    `description_${i}_${j}`,
                      formattedDate,
                      Math.random() < 0.5,
                      projectIds[Math.floor(Math.random() * projects.length)]
                ])
            }
            let query = `INSERT INTO todos (content, description, due_date, is_completed, project_id) VALUES ?`;
            await connection.query(query, [todos]);

            console.log(`Inserted ${i + BATCH_SIZE} todos`);
        }
        await connection.query(`ALTER TABLE todos ENABLE KEYS`);
    }
    catch(err) {
        console.log('Error while inserting todos:', err);
    }
    finally{
         connection.release();
    }
}

async function seedDatabase() {
     await insertUsers();
     await insertProjects();
     await insertTodos();

     console.log('Data insertion completed...');
}

seedDatabase();

