const axios = require('axios');

const sendTelegram = async (orderData, orderId) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

let products = '';
let total = 0;

orderData.product.forEach((item) => {
  const itemTotal = item.price * item.quantity;
  total += itemTotal;

  products += `🛍️ اسم المنتج: ${item.title}
📦 الكمية: ${item.quantity}
💰 سعر المنتج: ${itemTotal.toFixed(2)} جنيه
────────────────────
`;
});

products += `\n💵 *إجمالي الطلب: ${total.toFixed(2)} جنيه*`;

  const message = `
🛒 طلب جديد

👤 الاسم : ${orderData.name}

📞 الهاتف : ${orderData.phone}

📍 العنوان : ${orderData.address}

📦 المنتجات :

${products}

🆔 رقم الطلب :
${orderId}
`;

  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message,
  });
};

module.exports = sendTelegram;
