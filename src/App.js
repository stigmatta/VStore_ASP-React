import "./App.css";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";

import { useLocation,Route,Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";



function App() {
  const location = useLocation();
  const partialPathnames = ["/Login","/Registration"];
  const renderHeaderFooter = () => {
    return !(partialPathnames.includes(location.pathname));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {renderHeaderFooter() && <Header />}
      {renderHeaderFooter() && (
        <div className="block lg:hidden mx-auto w-[90%] md:w-3/4">
          <Searchbar />
        </div>
      )}
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Registration" element={<RegistrationPage />} />
      </Routes>

      {renderHeaderFooter() && <Footer />}
    </div>
  );
}

export default App;
