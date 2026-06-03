import { useState, useEffect } from 'react';
import { Plus, Trash2, Wallet, Banknote, Smartphone, BanknoteIcon, CircleDollarSign } from 'lucide-react';
import api from '../api/axios';
import Button from './ui/Button';
import Modal from './ui/Modal';

const methodIcons = {
    upi: Smartphone,
    bank_transfer: BanknoteIcon,
    cash: Banknote,
    other: Wallet,
};

export default function PaymentModal({ isOpen, onClose, milestone, onUpdated }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ amount: '', paid_at: new Date().toISOString().split('T')[0], method: 'upi', reference: '' });
    const [submitting, setSubmitting] = useState(false);

    const fetchPayments = () => {
        if (!milestone) return;
        api.get(`/projects/${milestone.project_id}/milestones/${milestone.id}/payments`)
            .then(res => setPayments(res.data.data))
            .finally(() => setLoading(false));
    };

   
    useEffect(() => {
        if (!milestone) return;

        setPayments([]);
        setLoading(true);

        api.get(`/projects/${milestone.project_id}/milestones/${milestone.id}/payments`)
            .then(res => setPayments(res.data.data))
            .finally(() => setLoading(false));
            
    }, [milestone?.id]);      

    const handleAdd = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post(`/projects/${milestone.project_id}/milestones/${milestone.id}/payments`, form);
            setForm({ amount: '', paid_at: new Date().toISOString().split('T')[0], method: 'upi', reference: '' });
            setShowForm(false);
            fetchPayments();
            if (onUpdated) onUpdated();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to record payment.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this payment?')) return;
        await api.delete(`/projects/${milestone.project_id}/milestones/${milestone.id}/payments/${id}`);
        fetchPayments();
        if (onUpdated) onUpdated();
    };

    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const milestoneAmount = Number(milestone?.amount) || 0;
    const percentage = milestoneAmount > 0 ? Math.round((totalPaid / milestoneAmount) * 100) : 0;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={<><CircleDollarSign size={16} className="inline mr-1 mb-1" />Payments — {milestone?.title || ''}</>} size="lg"
            footer={
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text">
                        Total Paid: <span className="text-success">₹{totalPaid.toLocaleString('en-IN')}</span>
                        <span className="text-text-muted text-xs ml-2">/ ₹{milestoneAmount.toLocaleString('en-IN')} ({percentage}%)</span>
                    </span>
                </div>
            }>
            <div className="space-y-3">
                {!showForm ? (
                    <Button variant="primary" className="btn-sm" onClick={() => setShowForm(true)}>
                        <Plus size={13} /> Record Payment
                    </Button>
                ) : (
                    <form onSubmit={handleAdd} className="p-4 border border-border rounded-xl bg-bg space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-semibold text-text-secondary mb-1">Amount (₹) *</label>
                                <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required
                                    className="w-full px-2.5 py-1.5 border border-border rounded-lg text-xs bg-card outline-none focus:border-accent" placeholder="10000" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-text-secondary mb-1">Date *</label>
                                <input type="date" value={form.paid_at} onChange={e => setForm({...form, paid_at: e.target.value})} required
                                    className="w-full px-2.5 py-1.5 border border-border rounded-lg text-xs bg-card outline-none focus:border-accent" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-semibold text-text-secondary mb-1">Method</label>
                                <select value={form.method} onChange={e => setForm({...form, method: e.target.value})}
                                    className="w-full px-2.5 py-1.5 border border-border rounded-lg text-xs bg-card outline-none focus:border-accent">
                                    <option value="upi">UPI</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                    <option value="cash">Cash</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-text-secondary mb-1">Reference</label>
                                <input type="text" value={form.reference} onChange={e => setForm({...form, reference: e.target.value})}
                                    className="w-full px-2.5 py-1.5 border border-border rounded-lg text-xs bg-card outline-none focus:border-accent" placeholder="Transaction ID" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" variant="primary" disabled={submitting} className="btn-xs">{submitting ? 'Saving...' : 'Save'}</Button>
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="btn-xs">Cancel</Button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <p className="text-xs text-text-muted text-center py-4">Loading payments...</p>
                ) : payments.length === 0 ? (
                    <p className="text-xs text-text-muted text-center py-4">No payments recorded yet.</p>
                ) : (
                    <div className="space-y-1">
                        {payments.map(p => {
                            const Icon = methodIcons[p.method] || Wallet;
                            return (
                                <div key={p.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-bg text-sm">
                                    <div className="flex items-center gap-2.5">
                                        <Icon size={14} className="text-text-muted" />
                                        <span className="font-medium text-text">₹{Number(p.amount).toLocaleString('en-IN')}</span>
                                        <span className="text-xs text-text-muted capitalize">via {p.method?.replace('_', ' ')}</span>
                                        {p.reference && <span className="text-[10px] text-text-muted">ref: {p.reference}</span>}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] text-text-muted">{new Date(p.paid_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                        <button onClick={() => handleDelete(p.id)} className="text-text-muted hover:text-danger transition-colors">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Modal>
    );
}