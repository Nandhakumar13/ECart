const mongoose = require('mongoose');

const db = () => {
  mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then((res) =>{
    console.log("DB Connected", res.connection.host);    
  }) 
} 

module.exports = db;