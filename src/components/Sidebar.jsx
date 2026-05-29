import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Clock, Settings, MessageSquare } from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: Clock, label: 'Timeline', path: '/timeline' },
];

const secondaryItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
];

export default function Sidebar({ onExpandedChange }) {

    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div
            className="fixed left-0 top-0 bottom-0 z-20 transition-all duration-300 flex flex-col"
            style={{
                width: expanded ? '208px' : '64px',
                background: 'linear-gradient(180deg, #0B1121 0%, #111A2E 100%)',
                borderRight: '1px solid rgba(255,255,255,0.04)',
            }}
            // onMouseEnter={() => setExpanded(true)}
            // onMouseLeave={() => setExpanded(false)}
               onMouseEnter={() => { setExpanded(true); onExpandedChange?.(true); }}
               onMouseLeave={() => { setExpanded(false); onExpandedChange?.(false); }}
        >
            {/* Top accent glow */}
            <div className="mx-3 mt-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-[#F5C97D] rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_3px_10px_rgba(229,168,75,0.3)]">
                    <span className="font-bold text-sm text-primary">P</span>
                </div>
                <span
                    className={`font-bold text-sm tracking-tight text-[#F5F5F5] whitespace-nowrap transition-all duration-200 ${
                        expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                    }`}
                >
                    PromiseLane
                </span>
            </Link>

            {/* Primary Nav */}
            <nav className="flex-1 py-4 space-y-1 px-3">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2.5 rounded-xl ... ${expanded ? 'gap-3' : 'gap-0 justify-center'}`}
                            style={{
                                backgroundColor: active ? 'rgba(229,168,75,0.10)' : 'transparent',
                                color: active ? '#F5D68A' : '#8A8FA3',
                                boxShadow: active ? 'inset 0 0 0 1px rgba(229,168,75,0.15)' : 'none',
                            }}
                        >
                            <Icon size={20} strokeWidth={active ? 2 : 1.6} />
                            <span
                                className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                                }`}
                            >
                                {item.label}
                            </span>
                            {active && (
                                <div className="absolute left-0 w-0.5 h-5 rounded-r-full bg-gradient-to-b from-accent to-accent-soft"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-4 border-t border-white/5"></div>

            {/* Secondary Nav */}
            <nav className="py-4 space-y-1 px-3">
                {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 text-[#8A8FA3] hover:text-[#8A8FA3] hover:bg-white/5 ${
                            expanded ? 'gap-3' : 'gap-0 justify-center'
                        }`}
                        >
                            <Icon size={20} strokeWidth={1.6} />
                            <span
                                className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                                }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-white/5 text-[10px] text-[#5A6070] text-center uppercase tracking-wider">
                {expanded ? 'PromiseLane · 2026' : 'PL'}
            </div>
        </div>
    );
}