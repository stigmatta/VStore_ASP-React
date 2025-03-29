import "./App.css";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const renderHeaderFooter = () => {
    return !(location.pathname === "/Login" || location.pathname === "/Registration");
  };

  return (
    <div className="relative bg-page-gradient min-h-screen w-full flex flex-col">
      {renderHeaderFooter() && <Header />}
      {renderHeaderFooter() && (
        <div className="block lg:hidden mx-auto w-[90%] md:w-3/4">
          <Searchbar />
        </div>
      )}
      {renderHeaderFooter() && <Footer/>}
    </div>
  );
}

export default App;
