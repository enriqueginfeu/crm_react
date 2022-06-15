import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
    return (
        <>
            <h1 className='font-bold text-4xl text-cyan-800'>NuevoCliente</h1>
            <p className='mt-10 font-semibold'>Registrar Un Nuevo Cliente</p>
        
            <Formulario />
        </>
    )
}

export default NuevoCliente