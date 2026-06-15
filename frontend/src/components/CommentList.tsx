import type { Comment } from "../api/comments";
import CommentCard from "./CommentCard";

type CommentListProps = {
  comments: Comment[];
  onUpdate: (id: number, text: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

function CommentList({ comments, onUpdate, onDelete }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="empty-message">No comments yet.</p>;
  }

  return (
    <section className="comment-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default CommentList;