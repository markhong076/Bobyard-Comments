import { useState } from "react";

type CommentAdderProps = {
    onAdd: (text: string) => Promise<void>;
};

function CommentAdder({ onAdd }: CommentAdderProps) {
    const [text, setText] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        try {
            setIsAdding(true);
            await onAdd(trimmedText);
            setText("");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <section className="comment-adder">
            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Write a comment..."
            />

            <button onClick={handleAdd} disabled={isAdding}>
                {isAdding ? "Adding..." : "Add Comment"}
            </button>
        </section>
    );
}

export default CommentAdder;