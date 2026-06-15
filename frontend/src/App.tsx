import { useState, useEffect } from 'react';
import "./App.css";

import CommentAdder from "./components/CommentAdder";
import CommentList from "./components/CommentList";
import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
  type Comment,
} from "./api/comments";

function App() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadComments = async () => {
      try {
        setError("");
        const data = await fetchComments();
        setComments(data);
      } catch {
        setError("Failed to load comments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      loadComments();
    }, []);

    const handleAddComment = async (text: string) => {
      await createComment(text);
      await loadComments();
    };

    const handleUpdateComment = async (id: number, text: string) => {
      await updateComment(id, text);
      await loadComments();
    };

    const handleDeleteComment = async (id: number) => {
      await deleteComment(id);
      await loadComments();
    };

    return (
      <main className="page">
        <section className="container">
          <header className="page-header">
            <h1>Bobyard Comments</h1>
          </header>

          <CommentAdder onAdd={handleAddComment} />

          {error && <p className="error-message">{error}</p>}
          
          {isLoading ? (
            <p className="loading-message">Loading comments...</p>
          ) : (
            <CommentList
              comments={comments}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          )}
        </section>
      </main>
    );
  }

  export default App;