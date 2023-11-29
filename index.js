const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const signup = require('./router/signup');
const login = require('./router/login');
const board = require('./router/board');
const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/signup', signup);
app.use('/login', login);
app.use('/board', board);

app.listen(port, ()=>{
    console.log(port, '번호로 서버연결되었습니다.');
});

module.exports = app;