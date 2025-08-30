// import { useProductContext } from "../ProductContext";
import { useSelector,useDispatch } from "react-redux";
import {  useEffect } from "react";
import {listenToOrders} from "../Redux/Reducers/OrderReducer";
import "../cssfiles/Order.css";
import {ReactSpinner} from "./ReactSpinner"

export function Orders() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(listenToOrders());
  }, [dispatch]);
  const  { orders, isLoading }= useSelector((state) => state.orders);
if (isLoading) {
    return <ReactSpinner />;
  }
  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}>
            <h2>
              Ordered on:{" "}
              {order.date?.toDate
    ? (() => {
        const d = order.date.toDate();
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      })()
    : order.date?.toString()}
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.product.id}>
                    <td>{item.product.title}</td>
                    <td>${item.product.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.product.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
