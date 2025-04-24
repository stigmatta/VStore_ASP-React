import { useState } from "react";
import GamesSection from "./sections/GamesSection";

export default function AdminDashboard() {
  const [section, setSection] = useState("games");

  return (
    <div>
      <nav>
        <button onClick={() => setSection("games")}>Игры</button>
      </nav>

      <hr />

      {section === "games" && <GamesSection />}
    </div>
  );
}
