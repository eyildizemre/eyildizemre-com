import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    return (
        <div className="min-h-screen">
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-10"
                    style={{ background: "var(--color-overlay)" }}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isSidebarOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
