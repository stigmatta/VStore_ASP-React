import {Route,Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CreatedPage from "./pages/CreatedPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

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
          <Route path = "/Cart"/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Registration" element={<RegistrationPage />} />
          <Route path="/Created" element={<CreatedPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
