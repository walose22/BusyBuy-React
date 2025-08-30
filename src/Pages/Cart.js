import {updateCartQuantity,removeFromCart,purchaseCart,listenToCart} from "../Redux/Reducers/CartReducer";
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import "../cssfiles/Cart.css";
import {ReactSpinner} from "./ReactSpinner"
export function Cart(){
  const dispatch=useDispatch(); 
  useEffect(() => {
    dispatch(listenToCart());
    }, [dispatch]);
    
      const { cart, totalPrice, isLoading } = useSelector((state) => state.cart);

   if (isLoading) {
    return <ReactSpinner />;
  }
    return (
      
       <div className="cart-container">
         <aside className="cart-sidebar">
            <span>Total Price:- {`$${totalPrice}`}</span>
            <button onClick={()=>{dispatch(purchaseCart())}}>purchase</button>
         </aside>
         <main className="cart-main">
            {cart.length === 0 ? (<h2 style={{  margin: "auto"}}>No items in cart</h2>) : 
              cart.map((item)=>(
                <div className="cart-card" key={item.id}>
                  <img src={item.product.img} />
                  <span>{item.product.title}</span>
                  <div className="cart-card-inc-dec">
                  <span>{`$${item.product.price}`}</span>
                    <button onClick={() => dispatch(updateCartQuantity({productId:item.product.id,quantity: item.quantity - 1}))} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(updateCartQuantity({productId:item.product.id,quantity: item.quantity + 1}))}>+</button>
                  </div>
                  <div>  
                  <button onClick={() => dispatch(removeFromCart({productId:item.product.id}))} className="remove-button">
                   Remove From Cart
                  </button>
                  </div>
                </div>
              ))
            }
         </main>
         
       </div>
       
    );

}