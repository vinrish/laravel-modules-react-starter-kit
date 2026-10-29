import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

interface AppLogoProps {
    name?: string;
    className?: string;
}

export default function AppLogo({ name = 'School LMS', className = '' }: AppLogoProps) {
    return (
        <Link
            href="/"
            className={`flex items-center gap-2.5 text-lg font-bold tracking-tight ${className}`}
        >
            <AppLogoIcon className="h-7 w-auto text-[#f9322c]" />
            <span>{name}</span>
        </Link>
    );
}
