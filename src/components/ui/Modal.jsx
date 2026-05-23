import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className={`bg-card rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
                        <h3 className="text-base font-bold text-primary">{title}</h3>
                        <button onClick={onClose} className="p-1 rounded-lg hover:bg-border/50 transition-colors text-text-muted hover:text-text">
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="px-5 py-4 overflow-y-auto flex-1">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-5 py-4 border-t border-border bg-bg rounded-b-2xl flex-shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}