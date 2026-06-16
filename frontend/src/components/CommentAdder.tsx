import { useState } from "react";

type CommentAdderProps = {
    onAdd: (text: string) => Promise<void>;
};

function CommentAdder({ onAdd }: CommentAdderProps) {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        try {
            setIsAdding(true);
            await onAdd(trimmedText);
            setText("");
            setShowModal(false);
        } finally {
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setText("");
        setShowModal(false);
    }

    return (
        <>
            <button 
                className="floating-add-button"
                onClick={() => setShowModal(true)}
                aria-label="Add Comment"
            >
                +
            </button>


            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Add a Comment</h2>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write your comment here..."
                        />

                        <div className="modal-actions">
                            <button 
                                className="cancel-button"
                                onClick={handleCancel}
                                disabled={isAdding}
                            >
                                Cancel
                            </button>
                            <button 
                                className="save-button"
                                onClick={handleAdd}
                                disabled={isAdding}
                            >
                                {isAdding ? "Adding..." : "Add Comment"}
                            </button>
                        </div>
                    </div>
                </div>
             )}
        </>
    );
}

export default CommentAdder;