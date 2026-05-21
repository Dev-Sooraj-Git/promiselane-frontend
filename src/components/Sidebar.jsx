import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Clock, Settings } from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: Clock, label: 'Timeline', path: '/timeline' },
];

const secondaryItems = [
    { icon: Settings, label: 'Settings', path: '/settings', phase: 3 },
];

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div
            className="fixed left-0 top-10 bottom-0 z-20 transition-all duration-300 flex flex-col border-r shadow-sm"
            style={{
                width: expanded ? '208px' : '64px',
                backgroundColor: '#FAFAF7',
                borderColor: '#E8E6E1',
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {/* Gradient accent strip at top */}
            {/* <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0D9488, #F59E0B)' }}></div> */}

            {/* Primary Nav Items */}
            <nav className="flex-1 py-6 space-y-1 px-3">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-2.5 py-2.5 rounded-xl transition-all duration-200 ${expanded ? 'gap-3' : 'gap-0 justify-center'}`}
                            style={{
                                backgroundColor: active ? '#FFFFFF' : 'transparent',
                                color: active ? '#0D9488' : '#78716C',
                                boxShadow: active ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                            }}
                        >
                            <Icon size={22} strokeWidth={active ? 2 : 1.6} />
                            <span
                                className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 overflow-hidden w-0'
                                }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-4 border-t" style={{ borderColor: '#E8E6E1' }}></div>

            {/* Secondary Nav Items */}
            <nav className="py-4 space-y-1 px-3">
                {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                            style={{ color: '#A8A29E' }}
                        >
                            <Icon size={20} strokeWidth={1.6} />
                            <span
                                className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 overflow-hidden w-0'
                                }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}