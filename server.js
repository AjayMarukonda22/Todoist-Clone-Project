const express = require('express');
const projectRouter = require('./routes/project.routes');
const taskRouter = require('./routes/task.routes');
const urlNotFoundErrorHandler = require('./middlewares/notFound');
const GlobalErrorHandler = require('./middlewares/errorHandler');
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 8000;


const app = express();
app.use(express.json());

//Project router
app.use('/api/projects', projectRouter);

//Task router
app.use('/api/tasks', taskRouter);

//invalid route or url error handler
app.use(urlNotFoundErrorHandler);

//global error handler
app.use(errorHandler);



app.listen(port, () => console.log(`Server is running on port: ${port}`));