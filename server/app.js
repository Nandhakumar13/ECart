const express = require('express');
const app = express();
const errorMiddleware  = require("./middleware/error")

app.set('query parser', 'extended');

const products = require('./router/product');
const auth = require('./router/auth');
const home = require('./router/home');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/',home);
// app.get('/', (req, res) => {
//   res.send('Home Page');
// });

app.use(errorMiddleware);

module.exports = app;
