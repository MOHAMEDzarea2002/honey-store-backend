// orderService.js

// import the firebase config
const { db } = require('../config//firebase')

// import the FieldValue from firebase-admin/firestore
const { FieldValue } = require('firebase-admin/firestore');

// create a new order
const createOrder = async (orderData) => {
  // create a new order in the orders collection
  const orderRef = await db.collection('orders').add({
    ...orderData,
    status: "Pending",
    createdAt: FieldValue.serverTimestamp(),
  })
// return the order id
  return {
    id: orderRef.id,
  };
}

// get all orders with optional status filter, limit, cursor, and search
const getAllOrders = async ({ status, limit = 10, cursor, search }) => {

  let query = db.collection('orders').orderBy('createdAt', 'desc');

  // Search
  if (search) {
    query = query
      .where('name', '>=', search)
      .where('name', '<=', search + '\uf8ff')
      .orderBy('name');
  }

  if (status) {
    query = query.where('status', '==', status);
  }
  // Cursor Pagination
  if (cursor) {
    query = query.startAfter(new Date(cursor));
  }
  query = query.limit(Number(limit));

  const snapshot = await query.get();

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastDoc = snapshot.docs[snapshot.docs.length - 1];

  return {
    orders,
    nextCursor: lastDoc ? lastDoc.get('createdAt').toDate().toISOString() : null,
  };
};;

// get order by id
const getOrderById = async (id) => {
  const order = await db.collection('orders').doc(id).get();
// check if the order exists
  if (!order.exists) {
    throw new Error('Order not found');
  }
  return {
    id: order.id,
    ...order.data(),
  };
};

// update order by id
const updateOrderById = async (id, status) => {

  // get the order reference
  const orderRef = await db.collection('orders').doc(id);

  // update the order status
  await orderRef.update({ status });

// get the updated order
  const updatedOrder = await orderRef.get();
  // check if the order exists
  return {
    id: updatedOrder.id,
    ...updatedOrder.data(),
  };
};

// delete order by id
const deleteOrder = async (id) => {
  const orderRef = await db.collection('orders').doc(id).delete();
  return orderRef;

}

// export the functions
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrder,
};
