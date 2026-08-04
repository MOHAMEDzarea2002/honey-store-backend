console.log('=== FIREBASE DEBUG START ===');
console.log('PROJECT_ID:', JSON.stringify(process.env.FIREBASE_PROJECT_ID));
console.log('CLIENT_EMAIL:', JSON.stringify(process.env.FIREBASE_CLIENT_EMAIL));
console.log('PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY);
console.log('PRIVATE_KEY first 30 chars:', JSON.stringify(process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30)));
console.log('=== FIREBASE DEBUG END ===');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  }
  ),
});

const db = getFirestore();
const auth = getAuth()

module.exports = {
  db,
  auth
};
