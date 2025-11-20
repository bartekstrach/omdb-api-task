import { HeartIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Link, Outlet } from 'react-router';

export const GlobalLayout = () => (
    <>
        <header className="flex items-center justify-between p-8 border-b border-gray-700 bg-gradient-to-br from-teal-500 to-teal-100">
            <Link aria-label="Go to main page" className="flex space-x-4" to="/">
                <VideoCameraIcon className="h-9 w-9 text-gray-900" />
                <h1 className="text-3xl font-bold">OMDb API task</h1>
            </Link>
            <Link aria-label="View favorites" to="/favorites">
                <HeartIcon className="hover:fill-current h-9 w-9 text-gray-900" />
            </Link>
        </header>

        <main className="flex-1 p-8 md:px-16 lg:px-32 xl:px-48">
            <Outlet />
        </main>

        <footer className="p-8 border-t border-gray-700">Footer</footer>
    </>
);
