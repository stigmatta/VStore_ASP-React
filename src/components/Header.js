import GrayButton from "./GrayButton";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import { NavLink } from "react-router-dom";
import VLogo from "./VLogo";
import DownloadButton from "./Download";
import axios from "axios";

export default function Header() {
  const [authorized, setAuthorized] = useState(false);
  const handleLogout = async () => {
    console.log("Logout");
    const res = await axios.get("https://localhost:7192/api/logout", {
      withCredentials: true,
    });
    if (res.status === 200) {
      setAuthorized(false);
      window.location.reload();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://localhost:7192/api", {
          withCredentials: true,
        });
        setAuthorized(res.data);
      } catch (error) {
        console.error(error);
        setAuthorized(false);
      }
    };
    fetchData();
  }, []);

  const [dropdownOpened, setDropdownOpening] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpening(!dropdownOpened);
  };

  return (
    <header className="flex h-[4rem] bg-header-gradient ~px-3/6 ~imd/lg:text-button/text-bigButton items-center">
      <NavLink to="/">
        <div className="flex gap-3 md:gap-4">
          <VLogo width={30} height={28} />
          <h1 className="~text-highlightedText/title font-bold">STORE</h1>
        </div>
      </NavLink>

      <div className="hidden md:block">
        <nav className="flex gap-9 mx-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hoverSvg ${isActive ? "activeSvg" : ""}`
            }
          >
            <ul className="hoverLink">Discover</ul>
          </NavLink>

          <NavLink
            to="/Support"
            className={({ isActive }) =>
              `hoverSvg ${isActive ? "activeSvg" : ""}`
            }
          >
            <ul className="hoverLink">Support</ul>
          </NavLink>

          <NavLink
            to="/News"
            className={({ isActive }) =>
              `hoverSvg ${isActive ? "activeSvg" : ""}`
            }
          >
            <ul className="hoverLink">News</ul>
          </NavLink>
        </nav>
      </div>

      <div className="hidden lg:block">
        <Searchbar />
      </div>

      <div className="flex gap-3 md:gap-4 ml-auto items-center">
        <NavLink
          to="/Profile"
          className={({ isActive }) =>
            `hoverSvg ${isActive ? "activeSvg" : ""}`
          }
        >
          <svg
            name="profileImg"
            className="hoverSvg"
            width="24"
            height="24"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16797 17.349C4.41548 16.5252 4.92194 15.8032 5.61222 15.29C6.30249 14.7768 7.13982 14.4997 7.99997 14.5H12C12.8612 14.4997 13.6996 14.7774 14.3904 15.2918C15.0811 15.8062 15.5874 16.5298 15.834 17.355M1 10.5C1 11.6819 1.23279 12.8522 1.68508 13.9442C2.13738 15.0361 2.80031 16.0282 3.63604 16.864C4.47177 17.6997 5.46392 18.3626 6.55585 18.8149C7.64778 19.2672 8.8181 19.5 10 19.5C11.1819 19.5 12.3522 19.2672 13.4442 18.8149C14.5361 18.3626 15.5282 17.6997 16.364 16.864C17.1997 16.0282 17.8626 15.0361 18.3149 13.9442C18.7672 12.8522 19 11.6819 19 10.5C19 9.3181 18.7672 8.14778 18.3149 7.05585C17.8626 5.96392 17.1997 4.97177 16.364 4.13604C15.5282 3.30031 14.5361 2.63738 13.4442 2.18508C12.3522 1.73279 11.1819 1.5 10 1.5C8.8181 1.5 7.64778 1.73279 6.55585 2.18508C5.46392 2.63738 4.47177 3.30031 3.63604 4.13604C2.80031 4.97177 2.13738 5.96392 1.68508 7.05585C1.23279 8.14778 1 9.3181 1 10.5ZM7 8.5C7 9.29565 7.31607 10.0587 7.87868 10.6213C8.44129 11.1839 9.20435 11.5 10 11.5C10.7956 11.5 11.5587 11.1839 12.1213 10.6213C12.6839 10.0587 13 9.29565 13 8.5C13 7.70435 12.6839 6.94129 12.1213 6.37868C11.5587 5.81607 10.7956 5.5 10 5.5C9.20435 5.5 8.44129 5.81607 7.87868 6.37868C7.31607 6.94129 7 7.70435 7 8.5Z"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>
        <NavLink
          to="/Wishlist"
          className={({ isActive }) =>
            `hoverSvg ${isActive ? "activeSvg" : ""}`
          }
        >
          <svg
            name="wishlistImg"
            className="hoverSvg"
            width="24"
            height="24"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5003 10.0719L11.0003 17.4999L3.5003 10.0719C3.00561 9.59055 2.61594 9.01195 2.35585 8.37257C2.09575 7.73319 1.97086 7.04688 1.98904 6.35687C2.00721 5.66685 2.16806 4.98807 2.46146 4.36327C2.75485 3.73847 3.17444 3.18119 3.69379 2.72651C4.21314 2.27184 4.82101 1.92962 5.47911 1.72141C6.13722 1.51321 6.83131 1.44352 7.51767 1.51673C8.20403 1.58995 8.8678 1.80449 9.46718 2.14684C10.0666 2.48919 10.5885 2.95193 11.0003 3.50593C11.4138 2.95595 11.9364 2.49725 12.5354 2.15854C13.1344 1.81982 13.7968 1.60838 14.4812 1.53745C15.1657 1.46652 15.8574 1.53763 16.5131 1.74632C17.1688 1.95502 17.7743 2.29681 18.2919 2.7503C18.8094 3.20379 19.2277 3.75922 19.5207 4.38182C19.8137 5.00443 19.975 5.68082 19.9946 6.36864C20.0142 7.05647 19.8916 7.74093 19.6344 8.37918C19.3773 9.01744 18.9912 9.59576 18.5003 10.0779"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>

        <NavLink
          to="/Cart"
          className={({ isActive }) =>
            `hoverSvg ${isActive ? "activeSvg" : ""}`
          }
        >
          <svg
            name="cartImg"
            className="hoverSvg"
            width="24"
            height="24"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 15.5C3.53043 15.5 4.03914 15.7107 4.41421 16.0858C4.78929 16.4609 5 16.9696 5 17.5C5 18.0304 4.78929 18.5391 4.41421 18.9142C4.03914 19.2893 3.53043 19.5 3 19.5C2.46957 19.5 1.96086 19.2893 1.58579 18.9142C1.21071 18.5391 1 18.0304 1 17.5C1 16.9696 1.21071 16.4609 1.58579 16.0858C1.96086 15.7107 2.46957 15.5 3 15.5ZM3 15.5H14M3 15.5V1.5H1M14 15.5C14.5304 15.5 15.0391 15.7107 15.4142 16.0858C15.7893 16.4609 16 16.9696 16 17.5C16 18.0304 15.7893 18.5391 15.4142 18.9142C15.0391 19.2893 14.5304 19.5 14 19.5C13.4696 19.5 12.9609 19.2893 12.5858 18.9142C12.2107 18.5391 12 18.0304 12 17.5C12 16.9696 12.2107 16.4609 12.5858 16.0858C12.9609 15.7107 13.4696 15.5 14 15.5ZM3 3.5L17 4.5L16 11.5H3"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>
        {authorized === false ? (
          <NavLink to="/Login">
            <GrayButton text="Sign in" width="4.5rem" height="2.4375rem" />
          </NavLink>
        ) : (
          <GrayButton
            handleClick={handleLogout}
            text={"Sign out"}
            width="4.5rem"
            height="2.4375rem"
          />
        )}

        <DownloadButton />
        <div className="block md:hidden">
          <svg
            name="dropdownImg"
            onClick={toggleDropdown}
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 12.5C0.71667 12.5 0.479337 12.404 0.288004 12.212C0.0966702 12.02 0.000670115 11.7827 3.44827e-06 11.5C-0.000663218 11.2173 0.0953369 10.98 0.288004 10.788C0.48067 10.596 0.718003 10.5 1 10.5H17C17.2833 10.5 17.521 10.596 17.713 10.788C17.905 10.98 18.0007 11.2173 18 11.5C17.9993 11.7827 17.9033 12.0203 17.712 12.213C17.5207 12.4057 17.2833 12.5013 17 12.5H1ZM1 7.5C0.71667 7.5 0.479337 7.404 0.288004 7.212C0.0966702 7.02 0.000670115 6.78267 3.44827e-06 6.5C-0.000663218 6.21733 0.0953369 5.98 0.288004 5.788C0.48067 5.596 0.718003 5.5 1 5.5H17C17.2833 5.5 17.521 5.596 17.713 5.788C17.905 5.98 18.0007 6.21733 18 6.5C17.9993 6.78267 17.9033 7.02033 17.712 7.213C17.5207 7.40567 17.2833 7.50133 17 7.5H1ZM1 2.5C0.71667 2.5 0.479337 2.404 0.288004 2.212C0.0966702 2.02 0.000670115 1.78267 3.44827e-06 1.5C-0.000663218 1.21733 0.0953369 0.98 0.288004 0.788C0.48067 0.596 0.718003 0.5 1 0.5H17C17.2833 0.5 17.521 0.596 17.713 0.788C17.905 0.98 18.0007 1.21733 18 1.5C17.9993 1.78267 17.9033 2.02033 17.712 2.213C17.5207 2.40567 17.2833 2.50133 17 2.5H1Z"
              fill="#EEEEEE"
            />
          </svg>
        </div>
        {dropdownOpened && <HeaderDropdown />}
      </div>
    </header>
  );
}
