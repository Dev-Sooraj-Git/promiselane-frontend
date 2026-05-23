import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    return children;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes with Layout */}
                    <Route element={<ProtectedRoute><Layout><Outlet /></Layout></ProtectedRoute>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* <Route path="/projects" element={<div className="p-8 text-stone-600">Projects page coming soon.</div>} /> */}
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                    </Route>

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;