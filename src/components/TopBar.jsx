import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, Search, Bell, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function TopBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setDropdownOpen(false);
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-30 h-14 flex items-center justify-between border-b backdrop-blur-md"
            style={{
                backgroundColor: 'rgba(250,250,248,0.9)',
                borderColor: '#EBEBE8',
                paddingLeft: '15px',
                paddingRight: '20px',
            }}
        >
            {/* Left: Logo — placed after sidebar width */}
            <Link to="/dashboard" className="flex items-center gap-2.5">
                <span className="font-bold text-xl tracking-tight text-primary">
                    Promise<span className="text-accent">Lane</span>
                </span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-border/50 transition-colors text-text-muted">
                    <Search size={17} strokeWidth={1.6} />
                </button>
                <button className="p-2 rounded-lg hover:bg-border/50 transition-colors text-text-muted">
                    <Bell size={17} strokeWidth={1.6} />
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-border/50 transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-surface to-[#2D3A50] flex items-center justify-center text-accent-soft text-xs font-bold border border-accent/25 shadow-[0_0_0_3px_rgba(229,168,75,0.06)]">
                            {user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <span className="text-sm font-medium text-text hidden sm:block">
                            {user?.name?.split(' ')[0]}
                        </span>
                        <ChevronDown size={15} strokeWidth={1.6} className="text-text-muted" />
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-56 rounded-2xl shadow-lg border py-2 z-50 bg-card border-border"
                        >
                            <div className="px-5 py-3 border-b border-border">
                                <p className="text-sm font-semibold text-text">{user?.name}</p>
                                <p className="text-xs text-text-muted mt-0.5">{user?.email}</p>
                            </div>
                            <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-5 py-2.5 text-sm text-text-secondary hover:bg-bg transition-colors">
                                <LayoutDashboard size={16} strokeWidth={1.6} />
                                Dashboard
                            </Link>
                            <Link to="/settings" onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-5 py-2.5 text-sm text-text-secondary hover:bg-bg transition-colors">
                                <Settings size={16} strokeWidth={1.6} />
                                Settings
                            </Link>
                            <div className="border-t border-border mt-1 pt-1">
                                <button onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors">
                                    <LogOut size={16} strokeWidth={1.6} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}