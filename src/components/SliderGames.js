import SliderOneGame from "./SliderOneGame";

export default function SliderGames({ games }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 min-w-max">
        {games.map((game, index) => (
          <div key={index} className="min-w-[200px]">
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
