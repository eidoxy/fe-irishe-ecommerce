import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/Auth/SignIn";
// import SignUp from "./pages/Auth/SignUp";
import NotFound from "./pages/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./utils/protectedRoutes";

import Home from "./pages/Admin/Dashboard/Index";
import Products from "./pages/Admin/Products/Index";
import AddProduct from "./pages/Admin/Products/AddProduct";
import EditProduct from "./pages/Admin/Products/EditProduct";

import Categories from "./pages/Admin/Categories/Index";
import HomeProduct from "./pages/User/Home";
import Catalog from "./pages/User/Catalog"; 
import "./assets/toasty.css"

export default function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ScrollToTop />
        <Routes>
          {/* Home Page */}
          <Route index path="/" element={<HomeProduct />} />
          <Route path="/catalog" element={<Catalog />} />

          {/* Dashboard Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home/>} />
            <Route path="dashboard" element={<Home />} />

            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />

            {/* Categories */}
            <Route path="categories" element={<Categories />} />

            {/* Others Page */}
            <Route path="profile" element={<UserProfiles />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
