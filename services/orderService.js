const { db } = require('../config//firebase')
const { FieldValue } = require('firebase-admin/firestore');
const createOrder = async (orderData) => {
  const orderRef = await db.collection('orders').add({
    ...orderData,
    status: "Pending",
    createdAt: FieldValue.serverTimestamp(),
  })
  return {
    id: orderRef.id,
  };
}



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



const getOrderById = async (id) => {
  const order = await db.collection('orders').doc(id).get();

  if (!order.exists) {
    throw new Error('Order not found');
  }
  return {
    id: order.id,
    ...order.data(),
  };
};
const updateOrderById = async (id, status) => {
  const orderRef = await db.collection('orders').doc(id);
  await orderRef.update({ status });

  const updatedOrder = await orderRef.get();
  return {
    id: updatedOrder.id,
    ...updatedOrder.data(),
  };
};
const deleteOrder = async (id) => {
  const orderRef = await db.collection('orders').doc(id).delete();
  return orderRef;

}
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrder,
};
