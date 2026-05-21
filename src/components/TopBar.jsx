import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, Search, Bell } from 'lucide-react';

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
            className="fixed top-0 left-0 right-0 z-30 h-14 flex items-center justify-between border-b"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#E8E6E1', paddingLeft: '16px', paddingRight: '20px' }}
        >
            {/* Left: Logo — pushed further left, aligned with content */}
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #F59E0B)' }}
                >
                    <span className="text-white font-bold text-xs">P</span>
                </div>
                <span className="font-bold text-base tracking-tight" style={{ color: '#44403C' }}>
                    Promise<span style={{ color: '#0D9488' }}>Lane</span>
                </span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors" style={{ color: '#A8A29E' }}>
                    <Search size={18} strokeWidth={1.6} />
                </button>
                <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors" style={{ color: '#A8A29E' }}>
                    <Bell size={18} strokeWidth={1.6} />
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: '#0D9488' }}
                        >
                            {user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <span className="text-sm font-medium hidden sm:block" style={{ color: '#44403C' }}>
                            {user?.name?.split(' ')[0]}
                        </span>
                        <ChevronDown size={16} strokeWidth={1.6} style={{ color: '#A8A29E' }} />
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-60 rounded-2xl shadow-xl border py-2 z-50"
                            style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E6E1' }}
                        >
                            <div className="px-5 py-3 border-b" style={{ borderColor: '#E8E6E1' }}>
                                <p className="text-sm font-semibold" style={{ color: '#44403C' }}>{user?.name}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#A8A29E' }}>{user?.email}</p>
                            </div>
                            <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-stone-50 transition-colors" style={{ color: '#44403C' }}>
                                📊 Dashboard
                            </Link>
                            <Link to="/settings" onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-stone-50 transition-colors" style={{ color: '#44403C' }}>
                                ⚙️ Settings
                            </Link>
                            <div className="border-t mt-1 pt-1" style={{ borderColor: '#E8E6E1' }}>
                                <button onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-red-50 transition-colors" style={{ color: '#EF4444' }}>
                                    🚪 Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}