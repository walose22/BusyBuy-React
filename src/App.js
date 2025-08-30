import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import {ListenToAuthChanges} from "./Redux/Reducers/AuthReducer"
import { useDispatch } from 'react-redux';
import Navbar from './Components/Navbar';
import {Home} from './Pages/Home';
import {Cart} from './Pages/Cart';  
import { Signin } from './Pages/Signin';
import { SignUp } from './Pages/SignUp';
import { Orders } from './Pages/Orders';
import { NotFound } from './Pages/NotFound';
// import { Provider } from "react-redux";
import PrivateRoute from './PrivateRouter';
// import store from './Store';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListenToAuthChanges());
  }, [dispatch]);
  const routes = createBrowserRouter([
    {
    path: "/",
    element: <Navbar />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PrivateRoute />, // wrap protected routes
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/order",
            element: <Orders />,
          },
        ],
      },
      {
         path: "signin",
         element: <Signin /> 

      },
      { path: "signup", element: <SignUp /> },
    ],
  },

  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
