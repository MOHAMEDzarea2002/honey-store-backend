const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const {getAuth} = require('firebase-admin/auth');
const serviceAccountKey = require('./serviceAccountKey.json')
console.log("PROJECT:", process.env.FIREBASE_PROJECT_ID);
console.log("EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("KEY EXISTS:", !!process.env.FIREBASE_PRIVATE_KEY);
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  }
),
});

const db = getFirestore();
const auth = getAuth()

module.exports = { db ,
  auth
 };


