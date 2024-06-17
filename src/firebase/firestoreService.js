import { firestore } from './firebaseConfig';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';


export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "products"));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString() : null
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const saveOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(firestore, "orders"), order);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; 
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};


export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(firestore, "products"), product);
    return docRef.id; 
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};


export const fetchProductDetails = async (productId) => {
  try {
    const docRef = doc(firestore, "products", productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString() : null
      };
    } else {
      console.error("No product found with ID:", productId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
