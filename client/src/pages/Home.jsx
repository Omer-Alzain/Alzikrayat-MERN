import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import PhotoCard from '../components/PhotoCard.jsx';

const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await api.get('/api/photos');
                setPhotos(data.photos.slice(0, 3));
            } catch (err) {
                setError(err.message);
            }
        };
        loadPhotos();
    }, []);

    return (
        <>
            <section className="hero">
                <p className="hero-kicker">A home for the moments that matter</p>
                <h1>Alzikrayat</h1>
                <p className="tagline">Share Your Memories</p>
                <p className="hero-description">Every photograph carries a story. Keep those stories alive by sharing them with the community.</p>
                <div className="cta-row">
                    <Link to="/gallery" className="btn btn-hero-primary">Explore Archives</Link>
                    <Link to="/register" className="btn btn-hero-outline">Join Community</Link>
                </div>
            </section>

            <section className="section-header">
                <div>
                    <h2>Recent Memories</h2>
                    <p>A preview of what the community has shared so far</p>
                </div>
                <Link to="/gallery">View Full Gallery →</Link>
            </section>

            {error && <p className="message error-message">{error}</p>}
            <div className="card-grid home-grid">
                {photos.length === 0 && !error ? (
                    <p className="empty-state">No photos have been uploaded yet — <Link to="/upload">be the first to share one.</Link></p>
                ) : photos.map((photo) => <PhotoCard key={photo._id} photo={photo} />)}
            </div>
        </>
    );
};

export default Home;
