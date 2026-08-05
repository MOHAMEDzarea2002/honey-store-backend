// import the firebase auth from the config file
const {auth} =require('../config/firebase')

// middleware to verify the id token from the request header
const verifyIdToken = async (req,res,next) =>{
  try{
    // get the authorization header from the request
    const authHeader = req.headers.authorization
    // check if the authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({message:'Unauthorized'})
    }

    const token = authHeader.split(" ")[1]
    // verify the id token using the firebase auth instance
    const decodedToken = await auth.verifyIdToken(token)

    req.user = decodedToken
    next()
  } catch (error){
    return res.status(401).json({message:"invalid token"})
  }
}
module.exports = {
  verifyIdToken
}
