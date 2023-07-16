import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className='flex-col flex justify-center items-center md:w-full w-auto'>
                <div>
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white overflow-hidden rounded-lg shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
