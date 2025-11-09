import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const firebaseApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Muy importante: reemplazar \n
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")!,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // ej: "tu-proyecto.appspot.com"
      })
    : getApp();

export const storageBucket = getStorage(firebaseApp).bucket();