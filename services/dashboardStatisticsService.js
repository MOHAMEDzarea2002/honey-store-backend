// import the firebase database configuration

const {db} = require('../config/firebase');
// getDashboardStats function to get the dashboard statistics
const getDashboardStats = async () => {
  // get all orders and products from the database
  const orders = await db.collection('orders').get();
  // get all products from the database
  const products = await db.collection('products').get();
  // calculate the total number of orders, products, pending orders, delivered orders, and cancelled orders

  const totalOrders = orders.size;
  const totalProducts = products.size;

  // calculate the number of pending, delivered, and cancelled orders
  const pendingOrders = orders.docs.filter((doc) => doc.data().status === 'Pending').length;
  const deliveredOrders = orders.docs.filter((doc) => doc.data().status === 'Delivered').length;
  const cancelledOrders = orders.docs.filter((doc) => doc.data().status === 'cancelled').length;
  // return the dashboard statistics
  return {
    totalOrders,
    totalProducts,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
  };
}
// export the getDashboardStats function
module.exports = {
  getDashboardStats,
}
