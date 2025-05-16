import ProfilePicture from "./ProfilePicture";
import useWindowWidth from "../hooks/useWindowWidth";
import DefaultImage from "../images/user-profile.jpg";

export default function ProfileTitle({ user }) {
  const windowWidth = useWindowWidth();
  const userAvatar = user?.avatar ?? DefaultImage;
  return (
    <div className="flex w-fit gap-5 items-center mb-6">
      {windowWidth > 860 ? (
        <ProfilePicture size={"177px"} src={userAvatar} />
      ) : (
        <ProfilePicture size={"95px"} src={userAvatar} />
      )}
      <h1 className="text-formTitle font-semibold text-2xl">
        {user?.username}
      </h1>
    </div>
  );
}
