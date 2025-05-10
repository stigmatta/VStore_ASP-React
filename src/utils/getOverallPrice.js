export default function getOverallPrice(games) {
  let sum = 0;
  games.forEach((game) => {
    sum += game.price * (1 - game.discount / 100);
  });
  return sum;
}
