import SliderOneGame from "./SliderOneGame";

export default function SliderGames({ games }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex justify-between gap-4 min-w-max">
        {games.map((game, index) => (
          <div key={index}>
            <SliderOneGame
              title={game.title}
              image={game.image}
              price={game.price}
              discount={game.discount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
