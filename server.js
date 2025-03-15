const express = require('express');
const userRouter = require('./routes/user.routes');
const projectRouter = require('./routes/project.routes');
const todoRouter = require('./routes/todo.routes');
const commentRouter = require('./routes/comment.routes');
const urlNotFoundErrorHandler = require('./middlewares/notFound');
const GlobalErrorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 8000;


const app = express();
app.use(express.json());

//Users router
app.use('/api/users', userRouter);

//Projects router
app.use('/api/projects', projectRouter);

//Tasks router
app.use('/api/todos', todoRouter);

//Comments router
app.use('/api/comments', commentRouter);

//invalid route or url error handler
app.use(urlNotFoundErrorHandler);

//global error handler
app.use(GlobalErrorHandler);



app.listen(port, () => console.log(`Server is running on port: ${port}`));
console.log(new Date().toISOString().split('T')[0] )