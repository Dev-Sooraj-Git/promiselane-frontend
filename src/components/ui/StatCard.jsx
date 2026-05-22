export default function StatCard({ icon: Icon, value, label, color = '#E5A84B', className = '' }) {
    return (
        <div className={`bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
                    <Icon size={18} color={color} />
                </div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color }}>{value}</p>
            <p className="text-xs font-medium text-text-secondary">{label}</p>
        </div>
    );
}