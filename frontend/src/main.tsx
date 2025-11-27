import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NotFoundPage from './pages/error/Errors'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Login'
import "./main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </StrictMode>,
)
