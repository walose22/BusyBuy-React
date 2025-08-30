
import {useSelector,useDispatch} from "react-redux";
import {
  SET_SEARCH_TERM as onSearchChange,
  SET_FILTER_PRICE as onPriceChange,
  SET_CATEGORY_FILTER as onCategoryChange,
  InitialProducts
} from "../Redux/Reducers/ProductReducer";  
import {addToCart as ADD_TO_CART} from "../Redux/Reducers/CartReducer";
import {filterProducts} from "../Redux/Reducers/filterProducts";
import { useEffect } from "react";
import "../cssfiles/Home.css";
import {ReactSpinner} from "./ReactSpinner"
export function Home() {
 
const dispatch=useDispatch();
useEffect(() => {
  dispatch(InitialProducts());
}, [dispatch]);
const {filterPrice,isLoading,error} = useSelector((state) => state.products);
const filteredProducts = useSelector(filterProducts);
 if (isLoading) {
    return <ReactSpinner />;
  }

  return (
    <>
      <div className="home-main-component">
        <div className="home-header">
          {/* search functionality */}
          <input
            type="text"
            placeholder="Search By Name"
            onChange={(e) => dispatch(onSearchChange(e.target.value))}
          />
        </div>
        <div className="home-body">
          <aside className="home-sidebar">
            {/* Sidebar Filtering Options */}
            <h4>Filter</h4>
            <h4>price:{filterPrice}</h4>
            <input
              type="range"
              min={0}
              max={20000}
              step={100}
              onChange={(e) => dispatch(onPriceChange( e.target.value))}
            />
            <select onChange={(e) => dispatch(onCategoryChange(e.target.value))}>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </aside>
          <main className="home-content">
            {/* item details card */}
            {filteredProducts.length === 0
              ? <h1 style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)" }}>No products found</h1>
              : filteredProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.img} />
                    <span>{product.title}</span>
                    <span>{`$${product.price}`}</span>
                    <button onClick={() => dispatch(ADD_TO_CART({product:product}))}>
                      Add to Cart
                    </button>
                  </div>
                ))}
          </main>
        </div>
      </div>
      
    </>
  );
}
