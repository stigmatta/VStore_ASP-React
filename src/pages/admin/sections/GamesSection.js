import GameList from "../components/GameList";
import AddGameForm from "../components/AddGameForm";

export default function GamesSection() {
  return (
    <div>
      <h2>Игры</h2>
      <AddGameForm />
      <GameList />
    </div>
  );
}
