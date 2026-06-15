import { useState } from "react";
import type { Comment } from "../api/comments";

type CommentCardProps = {
  comment: Comment;
  onUpdate: (id: number, text: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

function CommentCard({ comment, onUpdate, onDelete }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formattedDate = new Date(comment.date).toLocaleString();
  const avatarLetter = comment.author.charAt(0).toUpperCase();

  const handleSave = async () => {
    const trimmedText = editedText.trim();

    if (!trimmedText) return;

    try {
      setIsSaving(true);
      await onUpdate(comment.id, trimmedText);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedText(comment.text);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(comment.id);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <article className="comment-card">
        <div className="comment-header">
          <div className="author-row">
            {comment.image ? (
              <img className="avatar-image" src={comment.image} alt={comment.author} />
            ) : (
              <div className="avatar-fallback">{avatarLetter}</div>
            )}

            <h2>{comment.author}</h2>
          </div>

          <p className="comment-date">{formattedDate}</p>
        </div>

        {isEditing ? (
          <textarea
            className="edit-textarea"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
          />
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}

        <div className="comment-footer">
          <p className="comment-likes">Likes: {comment.likes}</p>

          <div className="comment-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                  className="secondary-button"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>

                <button
                  className="danger-button"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </article>

      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Delete comment?</h3>
            <p>
              This action cannot be undone. Are you sure you want to delete this
              comment?
            </p>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                className="danger-button"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentCard;