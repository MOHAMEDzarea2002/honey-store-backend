const {db} = require('../config/firebase')

const getCategory = async () =>{
  const snapshot = await db.collection("categorys").get();
  const categories = snapshot.docs.map(doc => doc.data());
  return categories
}
module.exports={
  getCategory
}
