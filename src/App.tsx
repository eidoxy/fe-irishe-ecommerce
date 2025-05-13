import { BrowserRouter as Router, Routes, Route } from "react-router";
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

export default function App() {
  return (
    <>
      <Router>
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
