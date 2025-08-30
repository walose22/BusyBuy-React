import { auth } from '../../Firebaseinit';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { createSlice } from "@reduxjs/toolkit";

// Helper to store only serializable and safe fields
const serializeUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified
});

const authContext = createSlice({
    name: 'auth',
    initialState: {
        user: null, // will hold serialized user
        isLoading: false,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setUser, setLoading, setError } = authContext.actions;
export default authContext.reducer;

// Listen to auth state changes
export const ListenToAuthChanges = () => (dispatch) => {
   onAuthStateChanged(auth, (user) => {
       if (user) {
           dispatch(setUser(serializeUser(user)));
       } else {
           dispatch(setUser(null));
       }
   });
};

// Validate email/password
const validateCredentials = (email, password) => {
    if (!email.includes('@') || email.length < 6) {
      toast.error("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
};

// Sign in
export const signin = (email, password) => async (dispatch) => {
    if (!validateCredentials(email, password)) return;

    try {
      dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(serializeUser(userCredential.user)));
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error(error.message);
      dispatch(setError("Signin failed!"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Sign up
export const signup = (email, password) => async (dispatch) => {
    if (!validateCredentials(email, password)) return;

    try {
      dispatch(setLoading(true));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(serializeUser(userCredential.user)));
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
      dispatch(setError("Signup failed!"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Logout
export const logOut = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await signOut(auth);
      dispatch(setUser(null));
      toast.info("Logged out");
    } catch (error) {
      toast.error(error.message);
      dispatch(setError("Logout failed!"));
    } finally {
      dispatch(setLoading(false));
    }
  };
