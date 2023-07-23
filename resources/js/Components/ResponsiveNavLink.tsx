import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-red-400 text-red-700 bg-red-50 focus:text-red-800 focus:bg-red-100 focus:border-red-700'
                    : 'border-transparent text-white hover:text-gray-200 hover:bg-gray-50 hover:border-gary-300 focus:text-white focus:bg-gray-50 focus:border-gray-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
