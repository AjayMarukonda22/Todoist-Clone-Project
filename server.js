const express = require('express');
const authRouter = require('./routes/auth.routes');
const authenticateJWT = require('./middlewares/authMiddleware');
const userRouter = require('./routes/user.routes');
const projectRouter = require('./routes/project.routes');
const todoRouter = require('./routes/todo.routes');
const commentRouter = require('./routes/comment.routes');
const urlNotFoundErrorHandler = require('./middlewares/notFound');
const GlobalErrorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 8000;


const app = express();
app.use(express.json());

//Auth router
app.use('/api/auth', authRouter);

//Users router
app.use('/api/users', authenticateJWT, userRouter);

//Projects router
app.use('/api/projects',authenticateJWT, projectRouter);

//Tasks router
app.use('/api/todos',authenticateJWT, todoRouter);

//Comments router
app.use('/api/comments',authenticateJWT, commentRouter);

//invalid route or url error handler
app.use(urlNotFoundErrorHandler);

//global error handler
app.use(GlobalErrorHandler);



app.listen(port, () => console.log(`Server is running on port: ${port}`));