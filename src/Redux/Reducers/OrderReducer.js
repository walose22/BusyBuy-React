import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../Firebaseinit";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    SET_ORDERS: (state, action) => {
      state.orders = action.payload;
    },
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { SET_ORDERS, SET_LOADING, SET_ERROR } = orderSlice.actions;
export default orderSlice.reducer;

//  Thunk for listening to Firestore changes
export const listenToOrders = () => (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) return;

  dispatch(SET_LOADING(true));
  try {
    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    return onSnapshot(
      q,
      (snapshot) => {
        const orderItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(SET_ORDERS(orderItems));
        dispatch(SET_LOADING(false));
      },
      (error) => {
        dispatch(SET_ERROR(error.message));
        dispatch(SET_LOADING(false));
      }
    );
  } catch (error) {
    dispatch(SET_ERROR(error.message));
    dispatch(SET_LOADING(false));
  }
};
