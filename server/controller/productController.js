const Product = require("../model/ProductModel");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');

const productContMethods = {}

// get all products
productContMethods.getProducts = async (req,res,next) => {
//    const products =  await Product.find();

   const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();
   const products = await apiFeatures.query;


    res.status(200).json({
        success:true,
        count:products.length,
        products,
        message:"Get the product details"
    })
}

// get products by ID
productContMethods.getProductByID = async (req,res,next) => {
    // const getProductById = await Product.findById(req.params.id);

    let product = await findProductById(req.params.id);
    if(product){
        res.status(201).json({
            success:true,
            product:getProductById,
        })
    }else{
        return next(new ErrorHandler("Product not found !", 400))

        
    }
    
}



// create new product
productContMethods.createProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        message:"New product Created",
        product
    })
}) 


// update product
productContMethods.updateProductHandler = async (req, res, next) => {
  const product = await findProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: `Product not found with ID: ${req.params.id}` });
  }

  const updatedData = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, message: "Product Updated Successfully", product: updatedData });
};




// delete product 
productContMethods.deleteProduct = async (req, res, next) => {
  const product = await findProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: `Product not found with ID: ${req.params.id}` });
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Product Deleted Successfully" });
};



async function findProductById(id){
    return await Product.findById(id);
}


module.exports = productContMethods;