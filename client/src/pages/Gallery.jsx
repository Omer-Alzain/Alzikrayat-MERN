import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import PhotoCard from '../components/PhotoCard.jsx';
import Loading from '../components/Loading.jsx';

const layouts = [
    { value: 'grid-3', label: '3 Columns' },
    { value: 'grid-4', label: '4 Columns' },
    { value: 'list', label: 'List' },
    { value: 'slider', label: 'Slider' }
];

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [layout, setLayout] = useState('grid-3');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await api.get('/api/photos');
                setPhotos(data.photos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPhotos();
    }, []);

    return (
        <section className="gallery-page">
            <div className="gallery-header">
                <div>
                    <p className="eyebrow">THE COMMUNITY ARCHIVE</p>
                    <h1>Memories Gallery</h1>
                    <p className="sub">Browsing through shared memories.</p>
                </div>
                <Link to="/upload" className="btn btn-primary">Share a Memory</Link>
            </div>

            <div className="toolbar-row">
                <div className="layout-toggles" aria-label="Gallery layout">
                    {layouts.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            className={`layout-btn ${layout === item.value ? 'active' : ''}`}
                            onClick={() => setLayout(item.value)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                <span className="photo-count">{photos.length} {photos.length === 1 ? 'memory' : 'memories'}</span>
            </div>

            {loading && <Loading message="Loading memories..." />}
            {error && <p className="message error-message">{error}</p>}
            {!loading && !error && photos.length === 0 && (
                <p className="empty-state">No photos yet. <Link to="/upload">Upload the first one.</Link></p>
            )}
            {!loading && photos.length > 0 && (
                <div className={`card-grid ${layout}`}>
                    {photos.map((photo) => <PhotoCard key={photo._id} photo={photo} />)}
                </div>
            )}
        </section>
    );
};

export default Gallery;
