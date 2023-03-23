import { useState } from "react";
import { timestamp } from "../../firebase/Config";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { nanoid } from "nanoid";
import Avatar from "../../Components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComment({ project }) {
  const { updateDocument, response } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const model = nanoid();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: model,
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} /> <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comments" onSubmit={handleSubmit}>
        <label>
          <span>Add New Comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
