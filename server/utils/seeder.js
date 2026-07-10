const Product = require('../model/ProductModel');
const productsData = require('../data/products.json');
const dotenv = require('dotenv');
const db = require('../config/db.js');

dotenv.config({path:'server/config/config.env'});
db();

const seeder = async () => {
    try {
        await Product.deleteMany();
        console.log('Existing products deleted');  
        await Product.insertMany(productsData);
        console.log('Products data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding products data:', error);
        process.exit();
    }
};

seeder();   
module.exports = seeder;
