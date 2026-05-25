import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, FolderKanban, Target, CheckCircle, FileText, Clock } from 'lucide-react';
import api from '../api/axios';

const eventIcon = (type) => {
    switch (type) {
        case 'payment_recorded':
        case 'payment_deleted':
            return <DollarSign size={14} className="text-success" />;
        case 'project_created':
        case 'project_updated':
            return <FolderKanban size={14} className="text-accent" />;
        case 'milestone_created':
        case 'milestone_updated':
        case 'milestone_status_updated':
            return <Target size={14} className="text-accent" />;
        case 'milestone_deleted':
            return <Target size={14} className="text-danger" />;
        case 'requirement_added':
        case 'requirement_updated':
            return <FileText size={14} className="text-accent" />;
        case 'deliverable_uploaded':
            return <CheckCircle size={14} className="text-success" />;
        default:
            return <Clock size={14} className="text-text-muted" />;
    }
};

const eventColor = (type) => {
    if (type?.includes('deleted')) return 'bg-danger';
    if (type?.includes('created') || type?.includes('added') || type?.includes('uploaded') || type?.includes('recorded')) return 'bg-success';
    if (type?.includes('updated')) return 'bg-accent';
    return 'bg-border';
};

export default function Timeline() {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get(`/projects/${id}`),
            api.get(`/projects/${id}/timeline`),
        ])
            .then(([projRes, timeRes]) => {
                setProject(projRes.data.data);
                setEvents(timeRes.data.data || []);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-bg">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent border-r-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link to={`/projects/${id}`} className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-3">
                    <ArrowLeft size={15} /> Back to Project
                </Link>
                <h1 className="text-xl font-bold text-primary">Project Timeline</h1>
                <p className="text-sm text-text-muted mt-1">{project?.title} — All activity</p>
            </div>

            {/* Timeline */}
            {events.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <Clock size={36} className="mx-auto mb-3 text-text-muted opacity-40" />
                    <p className="text-sm text-text-secondary">No activity yet</p>
                    <p className="text-xs text-text-muted mt-1">Events will appear here as you work on this project.</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border"></div>

                    <div className="space-y-6">
                        {events.map((event) => (
                            <div key={event.id} className="flex gap-4">
                                {/* Icon */}
                                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${eventColor(event.event_type)}/10`}>
                                    {eventIcon(event.event_type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 bg-white border border-border rounded-xl p-4 shadow-sm">
                                    <p className="text-sm font-medium text-text">{event.title}</p>
                                    {event.description && (
                                        <p className="text-xs text-text-muted mt-1">{event.description}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                                        <span>{event.user_name || 'System'}</span>
                                        <span>·</span>
                                        <span>{new Date(event.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}