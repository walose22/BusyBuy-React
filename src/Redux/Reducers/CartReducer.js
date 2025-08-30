
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../Firebaseinit";
import {  collection,addDoc,updateDoc,  deleteDoc,  doc, query,where,onSnapshot,} from "firebase/firestore";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
    isLoading: false,
    error: "",
  },
  reducers: {
    SET_CART: (state, action) => {
      state.cart = action.payload;
      state.totalPrice = state.cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    CLEAR_CART: (state) => {
      state.cart = [];
      state.totalPrice = 0;
    },
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
  },
});

//
// 🔥 Thunks (async Firestore actions)
//

// Add product to cart
export const addToCart = ({product}) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const { cart } = getState().cart;

  if (!user) {
    toast.error("You must be signed in to add to cart");
    return;
  }

  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    toast.info("Product already in cart");
    return;
  }

  await addDoc(collection(db, "cart"), {
    product,
    quantity: 1,
    userId: user.uid,
  });

  toast.success("Added product to cart");
};

// Update quantity
export const updateCartQuantity = ({productId, quantity}) => async (
  dispatch,
  getState
) => {
  const item = getState().cart.cart.find((i) => i.product.id === productId);
  if (item) {
    const docRef = doc(db, "cart", item.id);
    await updateDoc(docRef, { quantity });
    toast.info("Updated product quantity");
  }
};

// Remove product
export const removeFromCart = ({productId}) => async (dispatch, getState) => {
  const item = getState().cart.cart.find((i) => i.product.id === productId);
  if (item) {
    await deleteDoc(doc(db, "cart", item.id));
    toast.success("Removed product from cart");
  }
};

// Purchase all items
export const purchaseCart = () => async (dispatch, getState) => {
  const { cart, totalPrice } = getState().cart;
  const { user } = getState().auth;

  if (!cart.length) return;

  await addDoc(collection(db, "orders"), {
    items: cart,
    total: totalPrice,
    userId: user.uid,
    email: user.email,
    date: new Date(),
  });

  for (const item of cart) {
    await deleteDoc(doc(db, "cart", item.id));
  }

  toast.success("Order placed successfully");
};

//
// 🔁 Listener (Firestore → Redux)
//
export const listenToCart = () => (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) return;

  const q = query(collection(db, "cart"), where("userId", "==", user.uid));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    dispatch(SET_CART(items));
  });
};

export const { SET_CART, CLEAR_CART, SET_LOADING, SET_ERROR } =
  cartSlice.actions;

export default cartSlice.reducer;
