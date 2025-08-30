import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../Redux/Reducers/AuthReducer";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../cssfiles/Signin.css";

export function Signin() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🚀 Redirect when user state changes (login success)
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation before sending to Firebase
    if (!email.includes("@") || email.length < 6) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // ✅ Always try to sign in
    dispatch(signin(email, password));
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form className="signin-container" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (email && (!email.includes("@") || email.length < 6)) {
              toast.info("Enter a correct email.");
            }
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signin-button" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <NavLink to="/signup" className="signup-link">
        Don't have an account? Sign Up
      </NavLink>
      <Outlet />
    </div>
  );
}
