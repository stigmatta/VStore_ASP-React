import { Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import SupportPage from "./pages/SupportPage";
import WishlistPage from "./pages/WishlistPage";
import NewsPage from "./pages/NewsPage";
import AchievementsPage from "./pages/AchievementsPage";
import GamePage from "./pages/GamePage/GamePage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/Main" element={<MainPage />} />
          <Route path="News" element={<NewsPage />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="Wishlist" element={<WishlistPage />} />
          <Route path="Cart" element={<CartPage />} />
          <Route path="Support" element={<SupportPage />} />
          <Route path="Achievements" element={<AchievementsPage />} />
          <Route path="Game" element={<GamePage />} />
          <Route path="Friends" element={<FriendsPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Registration" element={<RegistrationPage />} />
        </Route>
        <Route path="Admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
