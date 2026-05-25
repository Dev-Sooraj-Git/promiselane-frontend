import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Share2, Trash2, Plus, Search, User, Wallet, Calendar, ClipboardList, Clock } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import RequirementSection from '../components/RequirementSection';
import PaymentModal from '../components/PaymentModal';
import MilestoneFormModal from '../components/MilestoneFormModal';
import Modal from '../components/ui/Modal';

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPayments, setShowPayments] = useState(false);
    const [showMilestoneForm, setShowMilestoneForm] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState(null);
    const [showEditProject, setShowEditProject] = useState(false);
    const [editForm, setEditForm] = useState({ title: '', client_name: '', client_email: '', description: '', total_amount: '', status: 'active' });
    const [editSubmitting, setEditSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, mileRes] = await Promise.all([
                    api.get(`/projects/${id}`),
                    api.get(`/projects/${id}/milestones`)
                ]);
                setProject(projRes.data.data);
                setMilestones(mileRes.data.data);
                if (mileRes.data.data.length > 0) {
                    setSelectedMilestone(mileRes.data.data[0]);
                }
            } catch (err) {
                setError('Failed to load project details.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleMilestoneSubmit = async (formData) => {
        if (editingMilestone) {
            await api.put(`/projects/${id}/milestones/${editingMilestone.id}`, formData);
        } else {
            await api.post(`/projects/${id}/milestones`, formData);
        }
        // Refresh milestones
        const res = await api.get(`/projects/${id}/milestones`);
        setMilestones(res.data.data);
        if (res.data.data.length > 0) setSelectedMilestone(res.data.data[0]);
    };

    const handleDeleteMilestone = async (milestoneId) => {
        if (!confirm('Delete this milestone?')) return;
        await api.delete(`/projects/${id}/milestones/${milestoneId}`);
        const res = await api.get(`/projects/${id}/milestones`);
        setMilestones(res.data.data);
        setSelectedMilestone(res.data.data.length > 0 ? res.data.data[0] : null);
    };

    const handleEditProject = async (e) => {
        e.preventDefault();
        setEditSubmitting(true);
        try {
            await api.put(`/projects/${id}`, editForm);
            const res = await api.get(`/projects/${id}`);
            setProject(res.data.data);
            setShowEditProject(false);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update project.');
        } finally {
            setEditSubmitting(false);
        }
    };

    const handleDeleteProject = async () => {
        if (!confirm('Delete this entire project? This cannot be undone.')) return;
        await api.delete(`/projects/${id}`);
        window.location.href = '/projects';
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-bg">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent border-r-transparent"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-bg">
            <p className="text-danger text-sm">{error}</p>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-bg">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
                <div className="flex items-center gap-2 text-[13px] text-text-muted">
                    <Link to="/projects" className="hover:text-text transition-colors flex items-center gap-1">
                        <ArrowLeft size={14} /> Projects
                    </Link>
                    <span>/</span>
                    <span className="text-text font-semibold">{project?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="btn-sm" onClick={() => {
                        setEditForm({ title: project.title, client_name: project.client_name, client_email: project.client_email || '', description: project.description || '', total_amount: project.total_amount, status: project.status?.toLowerCase() });
                        setShowEditProject(true);
                    }}><Edit size={13} /> Edit</Button>
                    <Button variant="outline" className="btn-sm"><Share2 size={13} /> Share</Button>
                    <Link to={`/projects/${id}/timeline`}>
                            <Button variant="outline" className="btn-sm"><Clock size={13} /> Timeline</Button>
                    </Link>
                    <Button variant="danger" className="btn-sm" onClick={handleDeleteProject}><Trash2 size={13} /></Button>
                </div>
            </div>

            {/* Summary Bar */}
            <div className="flex items-center gap-5 px-5 py-3 border-b border-border bg-card flex-wrap">
                <h1 className="text-lg font-bold text-primary tracking-tight">{project?.title}</h1>
                <div className="flex gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><User size={12} /> {project?.client_name}</span>
                    <span className="flex items-center gap-1"><Wallet size={12} /> ₹{Number(project?.total_amount).toLocaleString('en-IN')}</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success/10 text-success">
                        ● {project?.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel — Milestone List */}
                <div className="w-[300px] border-r border-border bg-card flex flex-col flex-shrink-0">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <h2 className="text-[13px] font-semibold text-text">Milestones</h2>
                       <Button variant="primary" className="btn-xs" onClick={() => { setEditingMilestone(null); setShowMilestoneForm(true); }}>
                            <Plus size={12} /> Add
                        </Button>
                    </div>
                    <div className="px-3 py-2">
                        <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input type="text" placeholder="Search milestones..." className="w-full pl-7 pr-2.5 py-1.5 border border-border rounded-lg text-xs bg-bg outline-none focus:border-accent transition-colors" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-3">
                        {milestones.map(m => (
                            <div key={m.id} onClick={() => setSelectedMilestone(m)}
                                className={`px-3 py-2.5 rounded-lg cursor-pointer transition-all mb-1 ${
                                    selectedMilestone?.id === m.id
                                        ? 'bg-accent/8 border border-accent/20'
                                        : 'hover:bg-bg border border-transparent'
                                }`}>
                                <div className="flex items-center gap-2.5 mb-1">
                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                        m.status === 'paid' ? 'bg-success shadow-[0_0_0_3px_rgba(45,138,110,0.12)]' :
                                        m.status === 'in_progress' ? 'bg-accent shadow-[0_0_0_3px_rgba(229,168,75,0.12)]' :
                                        'bg-border'
                                    }`}></span>
                                    <span className="text-[13px] font-semibold text-text truncate">{m.title}</span>
                                    <span className="text-xs font-semibold text-accent ml-auto flex-shrink-0">₹{Number(m.amount).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="text-[11px] text-text-muted ml-4">
                                    {m.status === 'paid' ? `Paid ${new Date(m.paid_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` :
                                     m.due_date ? `Due ${new Date(m.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : 'No due date'}
                                </div>
                                {/* Payment quick view button */}
                                <button className="mt-2 w-full flex items-center justify-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold border border-success/20 bg-success/5 text-success hover:bg-success/10 transition-colors"
                                    onClick={(e) => { e.stopPropagation();   setSelectedMilestone(m);  setShowPayments(true); }}>
                                    <Wallet size={10} /> View Payments
                                </button>
                            </div>
                        ))}
                        {milestones.length === 0 && (
                            <div className="text-center py-12 text-text-muted">
                                <ClipboardList size={28} className="mx-auto mb-2 opacity-40" />
                                <p className="text-xs">No milestones yet.</p>
                                <p className="text-[11px] mt-0.5">Add your first milestone to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel — Milestone Detail */}
                <div className="flex-1 overflow-y-auto p-6 bg-bg">
                    {selectedMilestone ? (
                        <div>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-primary tracking-tight">{selectedMilestone.title}</h3>
                                <div className="flex items-center gap-1">
                                    <button className="p-1.5 rounded-lg hover:bg-border/50 transition-colors text-text-muted hover:text-text"
                                        onClick={() => { setEditingMilestone(selectedMilestone); setShowMilestoneForm(true); }}>
                                        <Edit size={13} />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors text-text-muted hover:text-danger"
                                        onClick={() => handleDeleteMilestone(selectedMilestone.id)}>
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="flex gap-4 text-xs text-text-secondary mb-6 flex-wrap">
                                <span className="flex items-center gap-1"><Wallet size={12} /> ₹{Number(selectedMilestone.amount).toLocaleString('en-IN')}</span>
                                {selectedMilestone.due_date && (
                                    <span className="flex items-center gap-1"><Calendar size={12} /> Due {new Date(selectedMilestone.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                )}
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                    selectedMilestone.status === 'paid' ? 'bg-success/10 text-success' :
                                    selectedMilestone.status === 'in_progress' ? 'bg-accent/10 text-accent' :
                                    'bg-border/50 text-text-muted'
                                }`}>
                                    ● {selectedMilestone.status?.replace('_', ' ')}
                                </span>
                            </div>

                            {/* Requirements Section */}
                            <div className="mb-6">
                                {/* <div className="flex items-center justify-between mb-2.5">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">📋 Requirements</h4>
                                    <Button variant="outline" className="btn-xs"><Plus size={11} /> Add</Button>
                                </div>
                                <div className="text-center py-10 text-text-muted border border-dashed border-border rounded-xl">
                                    <ClipboardList size={24} className="mx-auto mb-2 opacity-30" />
                                    <p className="text-xs">No requirements yet</p>
                                    <p className="text-[11px] mt-0.5">Capture client requests linked to this milestone.</p>
                                </div> */}
                                <RequirementSection milestone={selectedMilestone} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-24 text-text-muted">
                            <ClipboardList size={36} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm">Select a milestone to view details</p>
                            <p className="text-xs mt-1">Requirements, deliverables, and payments will appear here.</p>
                        </div>
                    )}
                </div>  
            </div>
            <PaymentModal
                key={selectedMilestone?.id}
                isOpen={showPayments}
                onClose={() => setShowPayments(false)}
                milestone={selectedMilestone}
            />
            <MilestoneFormModal
                isOpen={showMilestoneForm}
                onClose={() => setShowMilestoneForm(false)}
                onSubmit={handleMilestoneSubmit}
                milestone={editingMilestone}
            />

            <Modal isOpen={showEditProject} onClose={() => setShowEditProject(false)} title="Edit Project">
                <form onSubmit={handleEditProject} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Title</label>
                        <input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} required
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Client Name</label>
                            <input type="text" value={editForm.client_name} onChange={e => setEditForm({...editForm, client_name: e.target.value})} required
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Client Email</label>
                            <input type="email" value={editForm.client_email} onChange={e => setEditForm({...editForm, client_email: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Amount (₹)</label>
                            <input type="number" value={editForm.total_amount} onChange={e => setEditForm({...editForm, total_amount: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">Status</label>
                            <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent">
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => setShowEditProject(false)} className="flex-1">Cancel</Button>
                        <Button type="submit" variant="primary" disabled={editSubmitting} className="flex-1">
                             {editSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
        
    );

     
}