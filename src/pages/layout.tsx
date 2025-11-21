import { HeartIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Link, Outlet } from 'react-router';

export const GlobalLayout = () => (
    <>
        <header className="flex items-center justify-between gap-4 p-8 border-b border-gray-700 bg-gradient-to-br from-teal-500 to-teal-100">
            <Link aria-label="Go to main page" className="flex items-center space-x-4" to="/">
                <div className="hidden sm:flex">
                    <VideoCameraIcon className="h-9 w-9 text-gray-900" />
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                    OMDb API task
                </h1>
            </Link>
            <Link aria-label="View favorites" to="/favorites">
                <HeartIcon className="hover:fill-current h-9 w-9 text-gray-900" />
            </Link>
        </header>

        <main className="flex-1 p-8 md:px-16 lg:px-32 xl:px-48">
            <Outlet />
        </main>

        <footer className="text-right p-8 md:px-16 lg:px-32 xl:px-48 border-t border-gray-700 text-gray-700">
            © Bartek Strach
        </footer>
    </>
);
