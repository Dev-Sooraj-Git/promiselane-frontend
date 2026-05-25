// import Sidebar from './Sidebar';
// import TopBar from './TopBar';

// export default function Layout({ children }) {
//     return (
//         <div className="min-h-screen bg-bg">
//             <Sidebar />
//             <TopBar />
//             <main className="pt-14 pl-[64px] transition-all duration-300 min-h-screen">
//                 {children}
//             </main>
//         </div>
//     );
// }

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }) {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-bg">
            <Sidebar onExpandedChange={setSidebarExpanded} />
            <TopBar />
            <main
                className="pt-14 transition-all duration-300 min-h-screen"
                style={{ marginLeft: sidebarExpanded ? '208px' : '64px' }}
            >
                {children}
            </main>
        </div>
    );
}