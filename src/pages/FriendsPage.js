import Image from "../images/user-profile.jpg";
import ProfilePicture from "../components/ProfilePicture";
import { useState } from "react";
import { Ban, Mail, User, UserPlus } from "lucide-react";
import Searchbar from "../components/Searchbar";
import ProfileTitle from "../components/ProfileTitle";

export default function FriendsPage() {
  const [view, setView] = useState("friends");
  const [searchTerm, setSearchTerm] = useState("");

  const user = {
    avatar: Image,
    username: "dimabalawov",
  };

  const mockUsers = Array(7)
    .fill(null)
    .map((_, index) => ({
      id: index,
      avatar: Image,
      username: `user${index}`,
    }));

  const getUsersByView = () => {
    switch (view) {
      case "friends":
        return mockUsers;
      case "add":
        return [];
      case "pending":
        return mockUsers.slice(0, 2);
      case "blocked":
        return mockUsers.slice(2, 5);
      default:
        return [];
    }
  };

  return (
    <div>
      <ProfileTitle user={user} />

      <div className="flex flex-col md:flex-row gap-10">
        <ul className="flex flex-row justify-between w-full md:flex-col md:justify-start  md:w-60 mt-5 gap-4">
          <FriendLink
            title="Your friends"
            ImgComp={User}
            active={view === "friends"}
            onClick={() => setView("friends")}
          />
          <FriendLink
            title="Add new"
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
            users={getUsersByView()}
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

function FriendList({ title, users, searchTerm, setSearchTerm }) {
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <Searchbar
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p className="opacity-70 text-title">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 l:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-5 border border-solid overflow-hidden border-gray-light transition-all duration-300
              hover:border-gray-lighter"
            >
              <ProfilePicture size={"75px"} src={user.avatar} />
              <span className="text-title">{user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
