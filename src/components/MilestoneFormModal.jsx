import { useState, useEffect } from 'react';
import Button from './ui/Button';
import Modal from './ui/Modal';

export default function MilestoneFormModal({ isOpen, onClose, onSubmit, milestone }) {
    const isEdit = !!milestone;
    const [form, setForm] = useState({ title: '', amount: '', due_date: '', status: 'pending' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (milestone) {
            setForm({
                title: milestone.title || '',
                amount: milestone.amount || '',
                due_date: milestone.due_date || '',
                status: milestone.status || 'pending',
            });
        } else {
            setForm({ title: '', amount: '', due_date: '', status: 'pending' });
        }
    }, [milestone, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await onSubmit(form);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Milestone' : 'Add Milestone'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-danger/5 border border-danger/20 text-danger text-xs px-3 py-2 rounded-lg">{error}</div>
                )}

                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">Title *</label>
                    <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" placeholder="e.g. Design Phase" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Amount (₹) *</label>
                        <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" placeholder="25000" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Due Date</label>
                        <input type="date" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg outline-none focus:border-accent transition-colors">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                        <option value="approved">Approved</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button type="submit" variant="primary" disabled={submitting} className="flex-1">
                        {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Milestone'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}