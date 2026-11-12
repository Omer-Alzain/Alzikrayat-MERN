import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

const Upload = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!user) {
        return (
            <section className="upload-page">
                <div className="upload-card upload-message">
                    <h1>Login Required</h1>
                    <p>Please log in before sharing a memory.</p>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            </section>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!photo) return setError('Please choose a photo to upload.');
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(photo.type)) {
            return setError('Only JPG, PNG and WEBP images are allowed.');
        }
        if (photo.size > 2 * 1024 * 1024) {
            return setError('The photo must be 2MB or smaller.');
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('photo', photo);

        setLoading(true);
        try {
            const data = await api.post('/api/photos', formData);
            navigate(`/photos/${data.photo._id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="upload-page">
            <div className="upload-card">
                <h1>Share a New Memory</h1>
                <p className="sub">Contribute a photograph to the archive.</p>
                {error && <p className="message error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className="form-group">
                            <label htmlFor="title">Photo Title</label>
                            <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g., Spring Graduation Picnic, 1994" maxLength="200" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description <span className="optional">(Optional)</span></label>
                            <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Share the story behind this photo..." maxLength="2000" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Photo File</label>
                            <div className="dropzone">
                                <input id="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setPhoto(event.target.files[0] || null)} required />
                                <p>JPG, PNG or WEBP, up to 2MB</p>
                                {photo && <span className="selected-file">{photo.name}</span>}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Photo to Archive'}</button>
                </form>
            </div>
        </section>
    );
};

export default Upload;
