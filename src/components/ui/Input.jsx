import { useState } from "react";
import {Eye, EyeOff} from "lucide-react";

export default function Input({label,type = 'text',value,onChange,onBlur,placeholder,error,required = false,className = ''}){

    const [show, setShow] = useState(false);
    const isPassword = type === 'password';

    return(
        <div>
            {label && <label className="block text-text text-sm font-medium mb-1.5">{label}</label>}
            <div className="relative">
                <input
                    type={isPassword && show ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2.5 border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all ${
                        isPassword ? 'pr-11' : ''
                    } ${error ? 'border-danger/50' : 'border-border'} ${className}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <p className="text-danger text-xs mt-1">{error}</p>}
        </div>
    );
}