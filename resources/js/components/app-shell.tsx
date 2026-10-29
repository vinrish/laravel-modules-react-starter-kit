import { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within an AppShell');
    }
    return context;
}

interface AppShellProps {
    variant?: 'sidebar' | 'header';
    className?: string;
}

export default function AppShell({
    variant = 'sidebar',
    className = '',
    children,
}: PropsWithChildren<AppShellProps>) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
            <div
                data-variant={variant}
                className={`flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC] ${className}`}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
}
