import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NotFound from "./pages/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import Home from "./pages/Admin/Dashboard/Index";
import Products from "./pages/Admin/Products/Index";
import AddProduct from "./pages/Admin/Products/AddProduct";
import Categories from "./pages/Admin/Categories/Index";
import HomeProduct from "./pages/User/Home";
import AllFlashSalesPage from "./pages/User/AllflashSalesPage"; 
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
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />

            {/* Products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />

            {/* Categories */}
            <Route path="/categories" element={<Categories />} />


            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
          </Route>

          {/* Users */}
          <Route path="/users" element={<HomeProduct />} />

           {/* Halaman "View All" untuk Flash Sales */}
          <Route path="/users/flash-sales" element={<AllFlashSalesPage />} /> {/* <-- Tambahkan route ini */}

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
