import { useCollection } from "./../hooks/useCollection";
import "./Onlineusers.css";
import Avatar from "./Avatar";

export default function Onlineusers() {
  const { error, documents } = useCollection("users");
  return (
    <div className="user-list">
      <h2>All User</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL}/>
          </div>
        ))}
    </div>
  );
}
