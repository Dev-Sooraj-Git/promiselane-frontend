import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Bell, Globe, LogOut, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'preferences', label: 'Preferences', icon: Globe },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-xl font-bold text-primary mb-6">Account Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <div className="space-y-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-accent/8 text-accent border border-accent/20'
                                        : 'text-text-secondary hover:bg-bg'
                                }`}
                            >
                                <Icon size={15} />
                                {tab.label}
                                <ChevronRight size={13} className="ml-auto opacity-40" />
                            </button>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-border">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/5 transition-all">
                            <LogOut size={15} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                    {activeTab === 'profile' && (
                        <Card>
                            <h2 className="text-sm font-semibold text-text mb-1">Profile Information</h2>
                            <p className="text-xs text-text-muted mb-5">Update your name and contact details.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">Full Name</label>
                                    <input type="text" defaultValue={user?.name}
                                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">Email</label>
                                    <input type="email" defaultValue={user?.email} disabled
                                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-border/30 text-text-muted outline-none" />
                                </div>
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card>
                            <h2 className="text-sm font-semibold text-text mb-1">Change Password</h2>
                            <p className="text-xs text-text-muted mb-5">Use a strong password that you don't use elsewhere.</p>

                            <div className="space-y-3">
                                <input type="password" placeholder="Current password"
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                                <input type="password" placeholder="New password"
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                                <input type="password" placeholder="Confirm new password"
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                                <Button variant="primary">Update Password</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card>
                            <h2 className="text-sm font-semibold text-text mb-1">Notification Preferences</h2>
                            <p className="text-xs text-text-muted mb-5">Control which emails you receive.</p>

                            <div className="space-y-4">
                                {[
                                    { label: 'Payment reminders', desc: 'When a milestone payment is due' },
                                    { label: 'Project updates', desc: 'When a milestone status changes' },
                                    { label: 'Deadline alerts', desc: 'Before a milestone deadline' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-text">{item.label}</p>
                                            <p className="text-xs text-text-muted">{item.desc}</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-accent focus:ring-accent" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {activeTab === 'preferences' && (
                        <Card>
                            <h2 className="text-sm font-semibold text-text mb-1">Display Preferences</h2>
                            <p className="text-xs text-text-muted mb-5">Customize your experience.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">Currency</label>
                                    <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent">
                                        <option>INR (₹)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">Date Format</label>
                                    <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent">
                                        <option>DD/MM/YYYY</option>
                                        <option>MM/DD/YYYY</option>
                                    </select>
                                </div>
                                <Button variant="primary">Save Preferences</Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}