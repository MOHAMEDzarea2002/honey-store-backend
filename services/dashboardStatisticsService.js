const {db} = require('../config/firebase');

const getDashboardStats = async (req,res) => {
  const orders = await db.collection('orders').get();
  const products = await db.collection('products').get();
  const totalOrders = orders.size;
  const totalProducts = products.size;
  const pendingOrders = orders.docs.filter((doc) => doc.data().status === 'Pending').length;
  const deliveredOrders = orders.docs.filter((doc) => doc.data().status === 'Delivered').length;
  const cancelledOrders = orders.docs.filter((doc) => doc.data().status === 'cancelled').length;
  return {
    totalOrders,
    totalProducts,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
  };
}
module.exports = {
  getDashboardStats,
}
