import "./App.css";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import Searchbar from "./components/Searchbar";

function App() {
  const location = useLocation();

  const renderHeader = () => {
    return !(location.pathname === "/login" || location.pathname === "/registration");
  };

  return (
    <div className="bg-page-gradient min-h-screen w-full flex flex-col">
      {renderHeader() && <Header />}
      {renderHeader() && (
        <div className="block lg:hidden mx-auto w-[90%] md:w-3/4">
          <Searchbar />
        </div>
      )}
    </div>
  );
}

export default App;
