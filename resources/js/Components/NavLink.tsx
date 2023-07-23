import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-red-400 text-white focus:border-red-700 '
                    : 'border-transparent text-white hover:text-gray-100 hover:border-gray-300 focus:text-gray-200 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
