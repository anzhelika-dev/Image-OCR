import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJlcKT3DZd-f0qgHJNa4i0cdLZSjMlObQ",
  authDomain: "image-ocr-856d1.firebaseapp.com",
  projectId: "image-ocr-856d1",
  storageBucket: "image-ocr-856d1.appspot.com",
  messagingSenderId: "1007730640082",
  appId: "1:1007730640082:web:72b52a42883f194686990b",
  measurementId: "G-JZ5KNDP4WB"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
export default firebase