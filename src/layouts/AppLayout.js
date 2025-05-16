import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomAutocomplete from "../components/CustomAutocomplete";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen h-fit w-full flex flex-col bg-page-gradient">
      <Header />
      <div className="block lg:hidden mx-auto w-[90%] md:w-3/4">
        <CustomAutocomplete />
      </div>

      <div
        className="px-0 w-[95%] mx-auto mb-16 pt-[36px]
                     imd:px-28"
      >
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
