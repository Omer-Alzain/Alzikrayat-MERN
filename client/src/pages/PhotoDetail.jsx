import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import CommentForm from '../components/CommentForm.jsx';
import Loading from '../components/Loading.jsx';

const PhotoDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const loadPhoto = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await api.get(`/api/photos/${id}`);
                setPhoto(data.photo);
                setComments(data.comments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPhoto();
    }, [id]);

    const addComment = async (comment) => {
        setSending(true);
        setError('');
        try {
            const data = await api.post(`/api/comments/${id}`, { comment });
            setComments((current) => [...current, data.comment]);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setSending(false);
        }
    };

    const deletePhoto = async () => {
        if (!window.confirm('Delete this photo permanently?')) return;
        try {
            await api.delete(`/api/photos/${id}`);
            navigate('/gallery');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <Loading message="Loading this memory..." />;
    if (error && !photo) return <p className="message error-message">{error} <Link to="/gallery">Back to gallery</Link></p>;
    if (!photo) return null;

    const isOwner = user && photo.userId && user._id === photo.userId._id;

    return (
        <section className="detail-layout">
            <div className="detail-main">
                <img className="detail-photo" src={`/uploads/${photo.fileName}`} alt={photo.title} />
                <div className="comments-section">
                    <h2>Comments ({comments.length})</h2>
                    {comments.length === 0 && <p className="muted-text">No comments yet. Be the first to share a thought.</p>}
                    {comments.map((item) => (
                        <article className="comment-item" key={item._id}>
                            <div className="avatar">{item.userId?.firstName?.charAt(0).toUpperCase() || '?'}</div>
                            <div className="comment-content">
                                <div className="name-row">
                                    <span className="name">{item.userId?.firstName} {item.userId?.lastName}</span>
                                    <span className="date">{new Date(item.dateTime).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                                </div>
                                <p>{item.comment}</p>
                            </div>
                        </article>
                    ))}

                    {user ? (
                        <>
                            <h3 className="comment-heading">Leave a comment</h3>
                            <CommentForm onSubmit={addComment} disabled={sending} />
                        </>
                    ) : (
                        <p><Link to="/login">Log in</Link> to leave a comment.</p>
                    )}
                </div>
            </div>

            <aside className="detail-sidebar">
                <p className="eyebrow">FROM THE ARCHIVE</p>
                <h1>{photo.title}</h1>
                <hr />
                <p className="description">{photo.description || 'No description was added for this memory.'}</p>
                <p className="detail-date">Uploaded {new Date(photo.dateTime).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p className="detail-owner">Shared by {photo.userId?.firstName} {photo.userId?.lastName}</p>
                {error && <p className="message error-message">{error}</p>}
                {isOwner && (
                    <>
                        <hr />
                        <button type="button" className="btn-delete" onClick={deletePhoto}>Delete This Photo</button>
                    </>
                )}
            </aside>
        </section>
    );
};

export default PhotoDetail;
