import DefaultImage from "../images/user-profile.jpg";
import ProfilePicture from "../components/ProfilePicture";
import { useEffect, useMemo, useState } from "react";
import { Ban, Mail, User, UserPlus } from "lucide-react";
import ProfileTitle from "../components/ProfileTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function FriendsPage() {
  const [view, setView] = useState("friends");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API_BASE = "https://localhost:7192/api";
  const navigate = useNavigate();
  const user = useCurrentUser();

  const ENDPOINTS = {
    add: () => `${API_BASE}/get-all`,
    friends: () => `${API_BASE}/profile/${user?.id}/friends`,
    pending: () => `${API_BASE}/profile/${user?.id}/pending`,
    blocked: () => `${API_BASE}/profile/${user?.id}/blocked`,
  };

  const handleUserRedirect = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = ENDPOINTS[view]();
      try {
        const response = await axios.get(endpoint, { withCredentials: true });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [view, user?.id]);

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      const username = user?.username || "";
      return username.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);
  return (
    <div>
      {user && <ProfileTitle user={user} />}

      <div className="flex flex-col md:flex-row gap-10">
        <ul className="flex flex-row justify-between w-full md:flex-col md:justify-start  md:w-60 mt-5 gap-4">
          <FriendLink
            title="Your friends"
            ImgComp={User}
            active={view === "friends"}
            onClick={() => setView("friends")}
          />
          <FriendLink
            title="Search"
            ImgComp={UserPlus}
            active={view === "add"}
            onClick={() => setView("add")}
          />
          <FriendLink
            title="Pending"
            ImgComp={Mail}
            active={view === "pending"}
            onClick={() => setView("pending")}
          />
          <FriendLink
            title="Blocked"
            ImgComp={Ban}
            active={view === "blocked"}
            onClick={() => setView("blocked")}
          />
        </ul>
        <div className="flex-1">
          <FriendList
            title={view.toUpperCase()}
            users={filteredUsers}
            fallback={DefaultImage}
            onUserClick={handleUserRedirect}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
    </div>
  );
}

function FriendLink({ title, ImgComp, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex gap-4 items-center h-10 px-3 rounded transition-all duration-200 hover:bg-gray-lighter ${
        active ? "bg-gray-lighter" : ""
      }`}
    >
      <div className="hidden md:block">
        <ImgComp size={24} />
      </div>
      <span className="font-medium text-button md:text-highlightedText">
        {title}
      </span>
    </button>
  );
}

function FriendList({
  title,
  users,
  fallback,
  onUserClick,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Searchbar
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 l:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-5 border border-solid overflow-hidden border-gray-light transition-all duration-300
              hover:border-gray-lighter hover:cursor-pointer"
            onClick={() => onUserClick(user.id)}
          >
            <ProfilePicture size={"75px"} src={user.avatar ?? fallback} />
            <span className="text-title">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
