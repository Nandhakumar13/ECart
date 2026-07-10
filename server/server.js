const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');

dotenv.config({path:path.join(__dirname,'config/config.env')});

db();

const server = app.listen(process.env.PORT,()=>{
    console.log(`===app is listenting in ${process.env.PORT}. env : ${process.env.NODE_ENV}`);
})


process.on('unHandledRejection', (err)=>{
    console.log(`Error :: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection');

    server.close(()=>{ 
        process.exit(1)
    })
    
})
