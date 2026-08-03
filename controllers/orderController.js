// Send Telegram notification Done Order Created
const sendTelegram = require('../services/telegramService');
// order service
const orderService = require('../services/orderService');
// create order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    const docRef = await orderService.createOrder(orderData);

    await sendTelegram(orderData, docRef.id);

    res.status(201).json({
      success: true,
      message: 'Order Created Successfully',
      id: docRef.id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all orders
const getOrders = async (req, res) => {
  try {
    const { search, cursor, status, limit = 10 } = req.query;
    const data = await orderService.getAllOrders({ search, cursor, limit, status });
    

    res.status(200).json({
      success: true,
      message: 'Orders Retrieved Successfully',
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get order by id
const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Order Retrieved Successfully',
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// update order status
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const orderUpdate = await orderService.updateOrderById(id, status);

    res.status(200).json({
      success: true,
      message: 'Order Updated Successfully',
      order: orderUpdate,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await orderService.deleteOrder(id);
    res.status(200).json({
      success: true,
      message: 'Order delete Successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateStatus,
  deleteOrder,
};
