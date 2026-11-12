import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Loading from './components/Loading.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import PhotoDetail from './pages/PhotoDetail.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import Upload from './pages/Upload.jsx';

const App = () => {
    const { loading } = useAuth();

    if (loading) return <Loading message="Opening Alzikrayat..." />;

    return (
        <>
            <Navbar />
            <main className="page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/photos/:id" element={<PhotoDetail />} />
                    <Route path="/login" element={<LoginRegister mode="login" />} />
                    <Route path="/register" element={<LoginRegister mode="register" />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default App;
