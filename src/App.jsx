import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from './pages/Home/Home';
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import UserProvider from "./context/User.context";
import { useState } from "react";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import Brands from "./pages/Brands/Brands";
import Categories from "./pages/Categories/Categories";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Verification from "./pages/Verification/Verification";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  //let [token, setToken] = useState(null)

  const router = createBrowserRouter([
    {
       path: "/", 
       element: (
         <ProtectedRoute>
           <Layout/>
         </ProtectedRoute>), 
       children:[
         {index:true, element: <Home/>}, {path:"cart",element:<Cart/>}, {path:"products",element:<Products/>},{path:"brands",element:<Brands/>},{path:"categories",element:<Categories/>},{path:"product/:id",element:<ProductDetails/>}, {path:"checkout",element:<Checkout/>},{path:"allorders",element:<Orders/>}
        ],
      },
      {
        path:"/",
        element:(
          <GuestRoute>
            <Layout/>
          </GuestRoute>),
        children: [
          {path: "signup", element: <Signup/>},
          {path: "login", element: <Login/>},
          {path: "forgetPassword" , element: <ForgetPassword/>},
          {path:"verifyCode", element: <Verification/>},
          {path:"resetPassword", element: <ResetPassword/>},
        ],
      },
  ]);
  return(
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router}/>
        </CartProvider>
      </UserProvider>
    </>
  )

  
  

}

export default App
