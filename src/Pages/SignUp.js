import { useState ,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {signup,ListenToAuthChanges} from "../Redux/Reducers/AuthReducer";
import { NavLink, Outlet,useNavigate } from "react-router-dom";
import "../cssfiles/Signup.css"; // Importing the CSS file for styling
export function SignUp() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();
useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(email, password));
  };

  return (
    <><div className="container">
          <h1>Sign Up</h1>
          <form className="signup-container" onSubmit={handleSubmit}>
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              <button className="signup-button" type="submit">Sign Up</button>
          </form>
          <NavLink to="/signin" className="signin-link">Already have an account? Sign In</NavLink>
      </div>
      <Outlet />
      </>
  );
}
