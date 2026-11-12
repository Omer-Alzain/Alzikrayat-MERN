import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            window.alert(error.message);
        }
    };

    return (
        <header className="navbar">
            <Link to="/" className="logo">
                <span className="logo-badge">A</span>
                <span className="logo-text">
                    <span className="en">Alzikrayat</span>
                    <span className="ar" dir="auto">الذكريات</span>
                </span>
            </Link>

            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/gallery">Gallery</NavLink>
                {user && <NavLink to="/upload">Upload</NavLink>}
            </nav>

            <div className="nav-auth">
                {user ? (
                    <>
                        <span className="status">Hi {user.firstName}</span>
                        <button type="button" className="btn btn-outline" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <span className="status">Please Login</span>
                        <Link to="/login" className="btn btn-outline">Login</Link>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
