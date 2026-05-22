export default function Button({ children, variant = 'primary', fullWidth = false, disabled = false, onClick, type = 'button', className = '' }) {
    const base = 'inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200';

    const variants = {
        primary: 'bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5',
        secondary: 'bg-white text-primary border border-border hover:border-accent hover:bg-accent/5',
        danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
        ghost: 'text-text-secondary hover:text-text hover:bg-border/50',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}