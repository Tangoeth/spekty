import React, { useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'w-[260px]' : 'w-0'
                    } bg-spekty-dark text-white flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}
            >
                <div className="p-3">
                    <div className="mb-4 px-2">
                        <img src="/spekty-logo-white.png" alt="Spekty" className="h-8 object-contain" />
                    </div>
                    <button className="flex items-center gap-2 border border-white/20 rounded-md p-3 w-full text-sm hover:bg-white/10 transition-colors text-left">
                        <span className="text-xl">+</span> New chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                    <div className="text-xs font-medium text-gray-400 mb-2 px-2">Aujourd'hui</div>
                    <div className="space-y-1">
                        {['Éligibilité BAR-TH-164', 'Audit Rénovation Globale', 'Suivi dossier #4920', 'Simulation Prime CEE', 'Contrôle qualité chantier'].map((item, i) => (
                            <button
                                key={i}
                                className="w-full text-left p-2 rounded-md hover:bg-white/10 text-sm truncate opacity-90 hover:opacity-100 transition-opacity"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-3 border-t border-white/20">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-spekty-blue flex items-center justify-center font-bold text-white">
                            S
                        </div>
                        <div className="text-sm font-medium">Spekty User</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Mobile/Sidebar Toggle Header */}
                <div className="absolute top-0 left-0 p-2 z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-600"
                    >
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        )}
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Layout;
