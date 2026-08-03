
const ProductService = require('../services/ProductService');
// create a new product
const createProduct =async (req,res)=>{
  const newProduct = req.body;
  try{
    const product = await ProductService.createProduct(newProduct);
    res.status(201).json({
      success: true,
      message: 'product Created Successfully',
      product,
    });
  }catch(error){
      console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
  // get all products
const getProducts =async (req,res)=>{

  const token = req.headers.authorization

  try{
    const { cursor,limit = 10} = req.query
    const products = await ProductService.getProducts({ limit, cursor });
    res.status(200).json({
      success: true,
      message: 'Products Retrieved Successfully',
      products,
    });
  }catch(error){


    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
}
// get product by id
const updateProduct =async (req,res)=>{
  const productId = req.params.id;
  const newUpdate = req.body
  try{
    const updatedProduct = await ProductService.updateProduct(productId, newUpdate);
    res.status(200).json({
      success: true,
      message: 'Product Updated Successfully',
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
//  delete product by id
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await ProductService.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try{
    const productById = await ProductService.getProductById(productId);
    res.status(200).json({
      success:true,
      message:'Product Retrieved Successfully',
      productById
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
}
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
