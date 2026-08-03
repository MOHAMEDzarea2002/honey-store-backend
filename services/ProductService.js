const { Timestamp } = require('firebase-admin/firestore');
const { db } = require('../config/firebase');
const { FieldValue } = require("firebase-admin/firestore");

// cerate a new product
const createProduct = async (newProduct) => {
  const docRef = await db.collection("products").add({...newProduct,
    createAt: FieldValue.serverTimestamp(),
  });

  const productDoc = await docRef.get();

  return {
    id: productDoc.id,
    ...productDoc.data()


  };
};

// get ProductById
const getProductById = async (productId) => {
  const productRef = await db.collection('products').doc(productId).get();
  if (!productRef.exists) {
    throw new Error('Product not found');
  } else {
    return {
      id: productRef.id,
      ...productRef.data(),
    };
  }

}
// get all products
const getProducts = async ({ limit, cursor }) => {
  let query = db
    .collection("products")
    .orderBy("createAt", "desc");

  if (cursor) {
    const lastDoc = await db.collection("products").doc(cursor).get();

    if (lastDoc.exists) {
      query = query.startAfter(lastDoc);
    }
  }

  query = query.limit(Number(limit) + 1);

  const snapshot = await query.get();

  const hasMore = snapshot.docs.length > Number(limit);

  const docs = hasMore
    ? snapshot.docs.slice(0, Number(limit))
    : snapshot.docs;

  const products = docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = docs[docs.length - 1];

  return {
    products,
    nextCursor: hasMore ? lastVisible.id : null,
    hasMore,
  };
};
// get product by id
const updateProduct = async (productId, newUpdate) => {
  const productRef = await db.collection('products').doc(productId);
  await productRef.update(newUpdate);
  const updatedProduct = await productRef.get();
  return {
    id: updatedProduct.id,
    ...updatedProduct.data()
  }
}
// delete product by id
const deleteProduct = async (productId) => {
  const productRef = await db.collection('products').doc(productId);
  await productRef.delete();

  return {
    id: productId,
  };
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
