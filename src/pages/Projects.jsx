import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderKanban, Calendar} from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Create form state
    const [form, setForm] = useState({
        title: '',
        client_name: '',
        client_email: '',
        description: '',
        total_amount: '',
        status: 'active',
    });
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState('');

    const fetchProjects = () => {
        api.get('/projects')
            .then(res => setProjects(res.data.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreateError('');
        setCreating(true);
        try {
            const res = await api.post('/projects', form);
            setProjects(prev => [res.data.data, ...prev]);
            setForm({ title: '', client_name: '', client_email: '', description: '', total_amount: '', status: 'active' });
            setShowCreateModal(false);
        } catch (err) {
            setCreateError(err.response?.data?.message || 'Failed to create project.');
        } finally {
            setCreating(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-bg">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent border-r-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-primary">My Projects</h1>
                    <p className="text-sm text-text-secondary mt-1">Manage your client projects and milestones</p>
                </div>
                <Button variant="primary" onClick={() => setShowCreateModal(true)}><Plus size={15} /> New Project</Button>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <FolderKanban size={36} className="mx-auto mb-3 text-text-muted opacity-40" />
                    <p className="text-sm text-text-secondary">No projects yet</p>
                    <p className="text-xs text-text-muted mt-1">Create your first project to start tracking.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {projects.map(p => (
                        <Link key={p.id} to={`/projects/${p.id}`}
                            className="block bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-accent/30 transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-text">{p.title}</h3>
                                    <p className="text-xs text-text-muted mt-1">Client: {p.client_name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-accent">₹{Number(p.total_amount).toLocaleString('en-IN')}</p>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${
                                        p.status === 'active' ? 'bg-success/10 text-success' : 'bg-border/50 text-text-muted'
                                    }`}>● {p.status}</span>
                                </div>
                            </div>

                            {/* Milestone Summary Row */}
                            {p.milestones_total > 0 && (
                                <>
                                    <div className="border-t border-border my-3"></div>
                                    <div className="flex items-center gap-4 text-xs text-text-secondary flex-wrap">
                                        <span className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                            {p.milestones_completed} of {p.milestones_total} milestones done
                                        </span>
                                        {p.next_milestone && (
                                            <span className="flex items-center gap-1 text-text-muted">
                                            <Calendar size={11} /> Next: {p.next_milestone}
                                                {p.next_due_date && ` · ${new Date(p.next_due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
                                            </span>
                                        )}
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-accent to-accent-soft rounded-full transition-all duration-500"
                                            style={{ width: `${Math.round((p.milestones_completed / p.milestones_total) * 100)}%` }}
                                        ></div>
                                    </div>
                                </>
                            )}
                        </Link>
                    ))}
                </div>
            )}

            {/* Create Project Modal */}
            <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Project">
                <form onSubmit={handleCreate} className="space-y-4">
                    {createError && (
                        <div className="bg-danger/5 border border-danger/20 text-danger text-xs px-3 py-2 rounded-lg">{createError}</div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Project Title *</label>
                        <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" placeholder="e.g. Logo Design" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Client Name *</label>
                            <input type="text" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} required
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" placeholder="Acme Corp" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Client Email</label>
                            <input type="email" value={form.client_email} onChange={e => setForm({...form, client_email: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" placeholder="client@acme.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Description</label>
                        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors resize-none" placeholder="Brief project description..." />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Total Amount (₹)</label>
                            <input type="number" value={form.total_amount} onChange={e => setForm({...form, total_amount: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" placeholder="50000" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Status</label>
                            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors">
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">Cancel</Button>
                        <Button type="submit" variant="primary" disabled={creating} className="flex-1">
                            {creating ? 'Creating...' : 'Create Project'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}