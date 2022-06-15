import { Outlet, Link, useLocation } from "react-router-dom"


const Layout = () => {

    const location = useLocation()
    const urlActual = location.pathname


    return (
        <div className="md:flex md: min-h-screen">
            <div className="md:w-1/4 bg-cyan-800 px-5 py-10 rounded-r-xl">
                <h2 className="text-4xl font-bold text-center text-white">
                    CRM - Clientes
                </h2>
                <nav className="mt-10">
                    <Link 
                        className={`${urlActual === '/clientes' ? 'text-blue-500' : 'text-white' } text-2xl block mt-2 hover:text-cyan-400`}
                        to="/clientes">
                        Clientes
                    </Link>
                    <Link
                        className={`${urlActual === '/clientes/nuevo' ? 'text-blue-500' : 'text-white' } text-2xl block mt-2 hover:text-cyan-400`}
                        to="/clientes/nuevo">
                        Nuevo Cliente
                    </Link>
                </nav>
            </div>
            <div className="md:w-3/4 px-5 md:h-screen overflow-scroll">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout