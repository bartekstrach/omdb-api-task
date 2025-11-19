import { Link, Outlet } from 'react-router';

export const GlobalLayout = () => (
    <>
        <header>
            <h1>OMDb</h1>
            <button>
                <Link to="/favorites">Favorites</Link>
            </button>
        </header>

        <main>
            <Outlet />
        </main>

        <footer>Footer</footer>
    </>
);
