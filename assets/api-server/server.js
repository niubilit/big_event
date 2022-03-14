const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./router/user.js');

app.use(cors());
app.use(express.urlencoded({ urlencoded: false }));
app.use('/bigEvent/api', userRouter);

app.listen(8088, () => {
    console.log('api server running at http://127.0.0.1:8088')
});