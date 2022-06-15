import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const DetallesCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClienteAPI =  async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        obtenerClienteAPI()
    }, [])
    
    return (
        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p className='font-semibold text-4xl text-cyan-800 mt-3 text-center'>El Cliente No Existe</p>
        : (

        <div className='border-double border-2 border-cyan-800 rounded-md mt-3 p-1 shadow-lg'>
            
            {cargando ? 'Cargando...' : (
            <>
            <h1 className='font-bold text-4xl text-cyan-800'>Cliente</h1>
            
            <p className='mt-5 mb-5 font-semibold text-xl'>Informacion del Cliente</p>

            {cliente.nombre && (
            <p className='text-4xl mt-3 ml-3'>
                <span className='font-semibold text-slate-700'>Nombre: </span>{cliente.nombre}
            </p>
            )}

            {cliente.email && (
            <p className='text-4xl mt-3 ml-3'>
                <span className='font-semibold text-slate-700'>Email: </span>{cliente.email}
            </p>
            )}

            {cliente.empresa && (
            <p className='text-4xl mt-3 ml-3'>
                <span className='font-semibold text-slate-700'>Empresa: </span>{cliente.empresa}
            </p>
            )}

            {cliente.telefono && (
            <p className='text-4xl mt-3 mb-3 ml-3'>
                <span className='font-semibold text-slate-700'>Telefono: </span>{cliente.telefono}
            </p>
            )}

            {cliente.observaciones && (
            <p className='text-4xl mt-3 mb-3 ml-3'>
                <span className='font-semibold text-slate-700'>Observaciones: </span>{cliente.observaciones}
            </p>
            )}
            </>
            )}
            
        </div>
        )
    )
}

export default DetallesCliente