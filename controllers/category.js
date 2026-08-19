const categoryService = require('../services/category')

const getCategory = async (req,res) =>{
  try{
    const category = await categoryService.getCategory()
    res.status(201).json({
      success: true,
      message: 'category Retrieved Successfully',
      category,
    })
  }catch(error){
    res.status({
      success: false,
      error: error.message
    })
  }
}
module.exports={
  getCategory
}
