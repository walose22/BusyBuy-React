import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Redux/Reducers/AuthReducer';
import {productReducer} from './Redux/Reducers/ProductReducer';
import CartReducer from './Redux/Reducers/CartReducer';
import OrderReducer from './Redux/Reducers/OrderReducer';
import {loggerMiddleware} from './Middleware/loggerMiddleware';

const store=configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: CartReducer,
        orders: OrderReducer
    },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
export default store;