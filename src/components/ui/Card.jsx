export default function Card({ children, className = "", padding = "p-6" }) {
  return (
    <div
      className={`bg-white border-border rounded-2xl shadow-sm ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
