import React, { Children } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'Nombre Invalido').max(30, 'Nombre Invalido').required('Campo Obligatorio'),
        empresa: Yup.string().required('Campo Obligatorio'),
        email: Yup.string().email('Email No Valido').required('Campo Obligatorio'),
        telefono: Yup.number().positive('No Se Admiten Numeros Negativos').integer('Telefono No Valido').typeError('Telefono No Valido').required('Campo Obligatorio'),
        observaciones: ''
    })

    const handleSubmit =  async ( values ) => {
        try {
            let respuesta

            if(cliente.id) {
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
    
                })
            } else {
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json()

            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
        <div className='bg-lime-50 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

            <h1 className='text-gray-500 font-bold text-xl text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>


            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    observaciones: cliente?.observaciones ?? '',
                }}
                enableReinitialize={true}

                onSubmit={ async ( valores, {resetForm} ) => {
                    await handleSubmit(valores)

                    resetForm()
                }}
                validationSchema={ nuevoClienteSchema }
            >
                {( {errors, touched} ) => {
                    
                    return (
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label htmlFor='nombre' className='text-gray-700 font-semibold'>
                            Nombre:
                        </label>
                        <Field
                            id='nombre'
                            type="text"
                            placeholder='Nombre Cliente'
                            className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                            name='nombre'
                        />
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ) : null }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='empresa' className='text-gray-700 font-semibold'>
                            Empresa:
                        </label>
                        <Field
                            id='empresa'
                            type="text"
                            placeholder='Empresa Cliente'
                            className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                            name='empresa'
                        />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='email' className='text-gray-700 font-semibold'>
                            Email:
                        </label>
                        <Field
                            id='email'
                            type="email"
                            placeholder='Email Cliente'
                            className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                            name='email'
                        />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='telefono' className='text-gray-700 font-semibold'>
                            Telefono:
                        </label>
                        <Field
                            id='telefono'
                            type="tel"
                            placeholder='Telefono Cliente'
                            className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                            name='telefono'
                        />
                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='observaciones' className='text-gray-700 font-semibold'>
                            Observaciones:
                        </label>
                        <Field
                            as='textarea'
                            id='observaciones'
                            type="text"
                            placeholder='Observaciones Sobre El Cliente'
                            className="mt-2 block w-full p-3 bg-gray-200 rounded-md h-40"
                            name='observaciones'
                        />
                        
                    </div>

                    <input 
                        type='submit'
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className='mt-5 p-3 w-full bg-blue-800 text-white font-semibold rounded-sm text-lg'
                    />
                </Form>
                )}}
            </Formik>
        </div>
        )
    )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario