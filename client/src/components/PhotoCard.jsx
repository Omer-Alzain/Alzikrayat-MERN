import { Link } from 'react-router-dom';

const PhotoCard = ({ photo }) => (
    <Link to={`/photos/${photo._id}`} className="photo-card">
        <img src={`/uploads/${photo.fileName}`} alt={photo.title} loading="lazy" />
        <div className="body">
            <h3>{photo.title}</h3>
            {photo.description && <p>{photo.description}</p>}
            <span className="date">
                {new Date(photo.dateTime).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' })}
                {photo.userId && ` · ${photo.userId.firstName} ${photo.userId.lastName}`}
            </span>
        </div>
    </Link>
);

export default PhotoCard;
