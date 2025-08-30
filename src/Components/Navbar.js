
import { NavLink, Outlet } from "react-router-dom";
import "../cssfiles/Navbar.css";
import { useSelector,useDispatch } from "react-redux";
import {ListenToAuthChanges,logOut} from "../Redux/Reducers/AuthReducer";
 import {ReactSpinner} from "../Pages/ReactSpinner"

function Navbar() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

 if (loading) {
    return <ReactSpinner />;
  }
   return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <NavLink to="/" className="logo">
            <span>🛒</span> Busy Buy
          </NavLink>
        </div>
        <div className="navbar-right">
          <ul>
            <li>
              <NavLink to="/">
                <span>🏠</span>Home
              </NavLink>
            </li>

            {!user && (
              <li>
                <NavLink to="/signin">
                  <span>🔑</span> Signin
                </NavLink>
              </li>
            )}

            {user && (
              <>
                <li>
                  <NavLink to="/order">
                    <span>📦</span>Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart">
                    <span>🛒</span>Cart
                  </NavLink>
                </li>
                <li>
                  <button onClick={() => dispatch(logOut())} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );

}

export default Navbar;
