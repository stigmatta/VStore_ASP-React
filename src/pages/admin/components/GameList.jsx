import { useEffect, useState } from "react";
import axios from "axios";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7192/api/admin/games", { withCredentials: true })
      .then((res) => {
        setGames(res.data);
      });
  }, []);
  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <strong>{game.title}</strong> — {game.price} руб.
        </li>
      ))}
    </ul>
  );
}
