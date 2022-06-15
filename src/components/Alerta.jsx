import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className='bg-red-700 text-white text-center font-semibold mt-2 text-lg rounded-sm p-1'>
            {children}
        </div>
    )
}

export default Alerta