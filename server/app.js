const express = require('express');
const app = express();
const errorMiddleware  = require("./middleware/error")

const products = require('./router/product');
const home = require('./router/home')


app.use(express.json());

app.use('/api/v1/',products);
app.use('/',home);
// app.get('/', (req, res) => {
//   res.send('Home Page');
// });

app.use(errorMiddleware)
module.exports = app;
