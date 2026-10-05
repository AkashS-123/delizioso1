import { Navigate, Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ReservationPage from "./pages/ReservationPage";
import ConfirmReservationPage from "./pages/ConfirmReservationPage";
import ConfirmReservationV2Page from "./pages/ConfirmReservationV2Page";
import ReservationSuccessPage from "./pages/ReservationSuccessPage";
import CancelReservationPage from "./pages/CancelReservationPage";
import ContactPage from "./pages/ContactPage";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginArt from "./pages/LoginArt";
import SignUpArt from "./pages/SignUpArt";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/reservation/confirm-v2" element={<ConfirmReservationV2Page />} />
      <Route path="/reservation/confirm" element={<ConfirmReservationPage />} />
      <Route path="/reservation/success" element={<ReservationSuccessPage />} />
      <Route path="/reservation/cancel" element={<CancelReservationPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/order-online/success" element={<Navigate to="/menu" replace />} />
      <Route path="/order-online/checkout" element={<CheckoutPage />} />
      <Route path="/order-online/shipping" element={<ShippingAddressPage />} />
      <Route path="/order-online" element={<OrderOnlinePage />} />
      <Route path="/order" element={<Navigate to="/order-online" replace />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup-art" element={<SignUpArt />} />
      <Route path="/login-art" element={<LoginArt />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
