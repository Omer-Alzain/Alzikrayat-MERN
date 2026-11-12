import { useState } from 'react';

const CommentForm = ({ onSubmit, disabled }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = comment.trim();
        if (!value) return;
        try {
            await onSubmit(value);
            setComment('');
        } catch (error) {
            // The detail page displays the request error.
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write a comment..."
                maxLength="1000"
                required
            />
            <button type="submit" className="btn-submit" disabled={disabled || !comment.trim()}>
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
