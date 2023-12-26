import { logout } from "@utils/Doctor";

const ProfilePopOverContent = () => {
  return (
    <div>
      <button onClick={logout} className="border-none">
        Logout
      </button>
    </div>
  );
};
export default ProfilePopOverContent;
