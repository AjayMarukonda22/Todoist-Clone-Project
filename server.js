const express = require('express');
const projectRouter = require('./routes/project.routes');
const taskRouter = require('./routes/task.routes');
const port = process.env.PORT || 8000;


const app = express();
app.use(express.json());

//Project router
app.use('/api/projects', projectRouter);

//Task router
app.use('/api/tasks', taskRouter);



app.listen(port, () => console.log(`Server is running on port: ${port}`));