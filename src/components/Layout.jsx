import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FFF7ED' }}>
            <TopBar />
            <Sidebar />
            <main className="pt-14 pl-[64px] transition-all duration-300 min-h-screen">
                {children}
            </main>
        </div>
    );
}