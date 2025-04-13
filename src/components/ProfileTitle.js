import ProfilePicture from "./ProfilePicture";
import useWindowWidth from "../hooks/useWindowWidth";

export default function ProfileTitle({ user }) {
  const windowWidth = useWindowWidth();
  return (
    <div className="flex w-fit gap-5 items-center mb-6">
      {windowWidth > 860 ? (
        <ProfilePicture size={"177px"} src={user.avatar} />
      ) : (
        <ProfilePicture size={"95px"} src={user.avatar} />
      )}
      <h1 className="text-formTitle font-semibold text-2xl">{user.username}</h1>
    </div>
  );
}
