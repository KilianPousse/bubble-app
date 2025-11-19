import { AvatarIcon } from "../lib/icons";

function Avatar({ size = 16, user = {} }) {
  const dimension = `${size}px`; 
  

  if(!user || !user.avatar) {
    return <AvatarIcon size={size} color="#cbd5e1" backgroundColor="#475569" />;
  }

  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center bg-black"
      style={{ width: dimension, height: dimension }}
    >
      <img
        src={user.avatar}
        alt={`Avatar of @${user.tag}`}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default Avatar;
