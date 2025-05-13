import useGetImage from "../hooks/useGetImage";

export function AchievementForSlider({ item }) {
  const photo = useGetImage(item?.photo);
  return (
    <div className="flex flex-col items-left w-[177px]">
      <img
        src={photo}
        alt={item.title}
        className="w-full h-[177px] rounded-xl"
      />
      <span className="mt-4">{item.title}</span>
      <span className="opacity-70 text-text">Completed by {item.percent}%</span>
    </div>
  );
}
