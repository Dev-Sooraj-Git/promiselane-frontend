export default function ActivityItem({ icon: Icon, title, name, date, color = '#E5A84B' }) {
    return (
        <div className="flex items-start gap-3 py-2.5 rounded-lg">
            <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '12' }}>
                <Icon size={14} color={color} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{title}</p>
                <p className="text-xs text-text-muted mt-0.5">{name} · {date}</p>
            </div>
        </div>
    );
}