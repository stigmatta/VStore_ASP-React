import {Route,Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";


function App() {

  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/Support"/>
          <Route path ="/News"/>
          <Route path = "/Profile"/>
          <Route path = "/Wishlist"/>
          <Route path = "/Cart" element={<CartPage/>}/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
