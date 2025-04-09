import GameTitle from './GameTitle';

export default function SeeInShopGame({ item }) {
  return (
    <div className="flex flex-col w-[369px] h-fit gap-5">
      <img className="w-full h-[207px] object-contain" src={item.image} alt="see-in-shop-img" />
      <GameTitle title={item.title}></GameTitle>
      <p className="text-text font-normal opacity-70">{item.description}</p>
      <button className="py-3 w-[135px] bg-gray-light font-semibold flex gap-2 justify-center items-center">
        <div>See in shop</div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H13C13.5304 17 14.0391 16.7893 14.4142 16.4142C14.7893 16.0391 15 15.5304 15 15V9M8 10L17 1M17 1H12M17 1V6"
            stroke="#EEEEEE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}