import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MessageSquare, Mail, Phone, FileText, HelpCircle, Search, Filter, Paperclip, ClipboardList } from 'lucide-react';
import api from '../api/axios';
import Button from './ui/Button';
import Modal from './ui/Modal';

const sourceIcons = {
    chat: MessageSquare,
    email: Mail,
    call: Phone,
    document: FileText,
    other: HelpCircle,
};

const statusColors = {
    agreed: 'bg-success/10 text-success',
    rejected: 'bg-danger/10 text-danger',
    requested: 'bg-accent/10 text-accent',
    pending_clarification: 'bg-amber-100 text-amber-700',
};

export default function RequirementSection({ milestone }) {
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingReq, setEditingReq] = useState(null);
    const [search, setSearch] = useState('');

    const fetchRequirements = () => {
        api.get(`/projects/${milestone.project_id}/requirements`)
            .then(res => setRequirements(res.data.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchRequirements(); }, [milestone.id]);

    // Filter by search
    const filtered = requirements.filter(r =>
        r.content?.toLowerCase().includes(search.toLowerCase()) &&
        r.milestone_id === milestone.id
    );

    // Inline form state
    const [form, setForm] = useState({ content: '', source: 'chat', status: 'requested', is_in_scope: true });

    const handleAdd = async (e) => {
        e.preventDefault();
        await api.post(`/projects/${milestone.project_id}/requirements`, {
            ...form,
            milestone_id: milestone.id,
        });
        setForm({ content: '', source: 'chat', status: 'requested', is_in_scope: true });
        setShowAddModal(false);
        fetchRequirements();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.put(`/projects/${milestone.project_id}/requirements/${editingReq.id}`, form);
        setEditingReq(null);
        fetchRequirements();
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this requirement?')) {
            await api.delete(`/projects/${milestone.project_id}/requirements/${id}`);
            fetchRequirements();
        }
    };

    const openEdit = (req) => {
        setEditingReq(req);
        setForm({ content: req.content, source: req.source, status: req.status, is_in_scope: req.is_in_scope });
    };

    if (loading) return <div className="py-4 text-center text-xs text-text-muted">Loading requirements...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5"><ClipboardList size={13} /> <span className="mt-[2px]">Requirements</span></h4>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-36 pl-6 pr-2 py-1 border border-border rounded-lg text-[11px] bg-bg outline-none focus:border-accent transition-colors"
                        />
                    </div>
                    <Button variant="outline" className="btn-xs" onClick={() => setShowAddModal(true)}>
                        <Plus size={11} /> Add
                    </Button>
                </div>
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-border rounded-xl">
                    <FileText size={22} className="mx-auto mb-2 text-text-muted opacity-30" />
                    <p className="text-xs text-text-muted">No requirements yet</p>
                    <p className="text-[11px] text-text-muted mt-0.5">Capture client requests linked to this milestone.</p>
                </div>
            ) : (
                <div className="space-y-1.5">
                    {filtered.map(req => {
                        const SourceIcon = sourceIcons[req.source] || HelpCircle;
                        return (
                            <div key={req.id}
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-card border border-border hover:border-accent/20 transition-all group">
                                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                    <SourceIcon size={13} className="text-text-muted flex-shrink-0" />
                                    <span className="text-[13px] text-text truncate">{req.content}</span>
                                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${statusColors[req.status]}`}>
                                        {req.status?.replace('_', ' ')}
                                    </span>
                                    {!req.is_in_scope && (
                                        <span className="text-[10px] text-danger/70 font-medium flex-shrink-0">Out of scope</span>
                                    )}
                                </div>
                                {/* <button className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-colors flex-shrink-0">
                                    <Paperclip size={10} /> Files
                                </button> */}
                                <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(req)} className="p-1 rounded hover:bg-border/50 text-text-muted hover:text-text">
                                        <Edit size={12} />
                                    </button>
                                    <button onClick={() => handleDelete(req.id)} className="p-1 rounded hover:bg-danger/10 text-text-muted hover:text-danger">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add Requirement Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Requirement">
                <RequirementForm form={form} setForm={setForm} onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} submitLabel="Add Requirement" />
            </Modal>

            {/* Edit Requirement Modal */}
            <Modal isOpen={!!editingReq} onClose={() => setEditingReq(null)} title="Edit Requirement">
                <RequirementForm form={form} setForm={setForm} onSubmit={handleUpdate} onCancel={() => setEditingReq(null)} submitLabel="Save Changes" />
            </Modal>
        </div>
    );
}

// Inline form component — reused for Add and Edit
function RequirementForm({ form, setForm, onSubmit, onCancel, submitLabel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Content *</label>
                <textarea
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors resize-none"
                    placeholder="What did the client ask for?"
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">Source</label>
                    <select
                        value={form.source}
                        onChange={e => setForm({ ...form, source: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent"
                    >
                        <option value="chat">Chat</option>
                        <option value="email">Email</option>
                        <option value="call">Call</option>
                        <option value="document">Document</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">Status</label>
                    <select
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent"
                    >
                        <option value="requested">Requested</option>
                        <option value="agreed">Agreed</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending_clarification">Pending Clarification</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="is_in_scope"
                    checked={form.is_in_scope}
                    onChange={e => setForm({ ...form, is_in_scope: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <label htmlFor="is_in_scope" className="text-xs text-text-secondary">In Scope</label>
            </div>
            <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1">{submitLabel}</Button>
            </div>
        </form>
    );
}