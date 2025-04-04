import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-page-gradient">
      <Header />
      <div className="block lg:hidden mx-auto w-[90%] md:w-3/4">
        <Searchbar />
      </div>

      <div className="px-36 flex-1 pt-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;