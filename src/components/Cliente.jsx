import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {

const navigate = useNavigate()

const { nombre, empresa, email, telefono, observaciones, id } = cliente

    return (
        <tr className='border-b hover:bg-gray-50 text-center'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 font-semibold'>Email: </span>{email}</p>
                <p><span className='text-gray-800 font-semibold'>Telefono: </span>{telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>

                <button type='button' onClick={() => navigate(`/clientes/${id}`)} className='w-full block bg-lime-600 hover:bg-lime-500 text-white text-md font-semibold rounded-sm'>
                    Detalles
                </button>

                <button type='button' onClick={() =>navigate(`/clientes/editar/${id}`)} className='w-full block mt-3 bg-blue-600 hover:bg-blue-500 text-white text-md font-semibold rounded-sm'>
                    Editar
                </button>
                
                <button type='button' className='w-full block mt-3 bg-red-600 hover:bg-red-500 text-white text-md font-semibold rounded-sm' onClick={() => handleEliminar(id)}>
                    Eliminar
                </button>

            </td>
        </tr>
    )
}

export default Cliente