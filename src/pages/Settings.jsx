import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    User, Mail, Shield, Bell, Globe, LogOut, ChevronRight,
    Lock, CreditCard, Info, AlertTriangle, Check, Eye, EyeOff
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../api/axios';

export default function Settings() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [saved, setSaved] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [passwordMsg, setPasswordMsg] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [profileName, setProfileName] = useState(user?.name || '');
    const [profileMsg, setProfileMsg] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);

    const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const sections = [
        {
            id: 'account',
            label: 'Account',
            icon: User,
            subsections: [
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'security', label: 'Security', icon: Lock },
            ],
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            subsections: [
                { id: 'notifications', label: 'Email Alerts', icon: Bell },
            ],
        },
        {
            id: 'preferences',
            label: 'Preferences',
            icon: Globe,
            subsections: [
                { id: 'preferences', label: 'Display & Format', icon: Globe },
            ],
        },
    ];

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMsg('');
        setPasswordLoading(true);
        try {

            if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
                setPasswordMsg('Passwords do not match.');
                setTimeout(() => setPasswordMsg(''), 3000);
                return;
            }

            if (passwordForm.new_password.length < 8) {
                setPasswordMsg('Password must be at least 8 characters.');
                setTimeout(() => setPasswordMsg(''), 3000);
                return;
            }

            const res = await api.post('/auth/change-password', passwordForm);
            setPasswordMsg(res.data.message);
            setPasswordForm({ current_password: '', new_password: '', new_password_confirmation: '' });
        } catch (err) {
            setPasswordMsg(err.response?.data?.message || 'Failed to change password.');
        } finally {
            setPasswordLoading(false);
            setTimeout(() => setPasswordMsg(''), 3000);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileMsg('');
        setProfileLoading(true);
        try {
            const res = await api.put('/auth/profile', { name: profileName });
            setProfileMsg(res.data.message);
        } catch (err) {
            setProfileMsg(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setProfileLoading(false);
            setTimeout(() => setProfileMsg(''), 3000);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary tracking-tight">Settings</h1>
                <p className="text-sm text-text-muted mt-1">Manage your account, security, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Left Sidebar — Section Navigation */}
                <div className="md:col-span-1 space-y-1">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = section.subsections.some(sub => sub.id === activeSection);
                        return (
                            <div key={section.id}>
                                <button
                                    onClick={() => setActiveSection(section.subsections[0].id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-accent/8 text-accent border border-accent/20'
                                            : 'text-text-secondary hover:bg-bg border border-transparent'
                                    }`}
                                >
                                    <Icon size={16} />
                                    <span>{section.label}</span>
                                    <ChevronRight size={13} className="ml-auto opacity-40" />
                                </button>
                                {isActive && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {section.subsections.map((sub) => (
                                            <button
                                                key={sub.id}
                                                onClick={() => setActiveSection(sub.id)}
                                                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                                                    activeSection === sub.id
                                                        ? 'text-accent font-semibold'
                                                        : 'text-text-muted hover:text-text'
                                                }`}
                                            >
                                                <sub.icon size={12} />
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Divider */}
                    <div className="pt-4 mt-4 border-t border-border space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/5 transition-all">
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="md:col-span-4">
                    {/* Profile */}
                    {activeSection === 'profile' && (
                        <Card padding="p-6">
                            {profileMsg && (
                                <div className={`text-xs px-3 py-2 rounded-lg mb-3 ${
                                    profileMsg.toLowerCase().includes('success')
                                        ? 'bg-success/5 border border-success/20 text-success'
                                        : 'bg-accent/5 border border-accent/20 text-accent'
                                }`}>
                                    {profileMsg}
                                </div>
                            )}

                            <form onSubmit={handleProfileSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileName}
                                            onChange={e => setProfileName(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-text-secondary mb-1">Email</label>
                                        <input type="email" defaultValue={user?.email} disabled
                                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-border/30 text-text-muted outline-none" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button type="submit" variant="primary" disabled={profileLoading}>
                                            {profileLoading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    )}

                   {/* Security */}
                    {activeSection === 'security' && (
                        <Card padding="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <Lock size={18} className="text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-text">Change Password</h2>
                                    <p className="text-xs text-text-muted">Use a strong, unique password.</p>
                                </div>
                            </div>

                            {passwordMsg && (
                                <div className={`text-xs px-3 py-2 rounded-lg mb-3 ${
                                    passwordMsg.toLowerCase().includes('success')
                                        ? 'bg-success/5 border border-success/20 text-success'
                                        : 'bg-accent/5 border border-accent/20 text-accent'
                                }`}>
                                    {passwordMsg}
                                </div>
                            )}

                            <form onSubmit={handlePasswordSubmit}>
                                <div className="space-y-3 max-w-md">
                                   <div className="relative">
                                        <input
                                            type={showCurrent ? 'text' : 'password'}
                                            placeholder="Current password"
                                            value={passwordForm.current_password}
                                            onChange={e => setPasswordForm({...passwordForm, current_password: e.target.value})}
                                            required
                                            className="w-full px-3 py-2 pr-10 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors"
                                        />
                                        <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
                                            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showNew ? 'text' : 'password'}
                                            placeholder="New password"
                                            value={passwordForm.new_password}
                                            onChange={e => setPasswordForm({...passwordForm, new_password: e.target.value})}
                                            required
                                            className="w-full px-3 py-2 pr-10 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors"
                                        />
                                        <button type="button" onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
                                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            placeholder="Confirm new password"
                                            value={passwordForm.new_password_confirmation}
                                            onChange={e => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})}
                                            required
                                            className="w-full px-3 py-2 pr-10 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors"
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3 pt-1">
                                        <Button type="submit" variant="primary" disabled={passwordLoading}>
                                            {passwordLoading ? 'Updating...' : 'Update Password'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => setPasswordForm({ current_password: '', new_password: '', new_password_confirmation: '' })}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {/* Danger Zone */}
                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
                                        <AlertTriangle size={18} className="text-danger" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-text">Danger Zone</h2>
                                        <p className="text-xs text-text-muted">Irreversible actions.</p>
                                    </div>
                                </div>
                                <button disabled
                                    className="px-4 py-2 border border-danger/30 text-danger/50 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
                                    Delete Account — Coming Soon
                                </button>
                            </div>
                        </Card>
                    )}

                    {/* Notifications */}
                    {activeSection === 'notifications' && (
                        <Card padding="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <Bell size={18} className="text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-text">Email Notifications<span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 ml-2">Coming Soon</span></h2>
                                    <p className="text-xs text-text-muted">Control which emails you receive.</p>
                                </div>
                            </div>

                            <div className="space-y-1 max-w-lg">
                                {[
                                    { label: 'Payment reminders', desc: 'When a milestone payment is due or received' },
                                    { label: 'Project updates', desc: 'When a milestone status changes' },
                                    { label: 'Deadline alerts', desc: '24 hours before a milestone deadline' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-bg transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-text">{item.label}</p>
                                            <p className="text-xs text-text-muted">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-9 h-5 bg-border rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Preferences */}
                    {activeSection === 'preferences' && (
                        <Card padding="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <Globe size={18} className="text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-text">Display Preferences<span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 ml-2">Coming Soon</span></h2>
                                    <p className="text-xs text-text-muted">Customize how PromiseLane looks.</p>
                                </div>
                            </div>

                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">Currency</label>
                                    <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors">
                                        <option>INR (₹)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">Date Format</label>
                                    <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors">
                                        <option>DD/MM/YYYY</option>
                                        <option>MM/DD/YYYY</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 pt-1">
                                    <Button variant="primary">Save Preferences</Button>
                                    <Button variant="outline">Cancel</Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-border text-center text-xs text-text-muted">
                <p>PromiseLane v1.0.0</p>
            </div>
        </div>
    );
}