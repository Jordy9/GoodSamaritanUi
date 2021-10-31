import React from 'react'
import { useForm } from '../../../hooks/useForm'
import { ProfileImg } from './ProfileImg'
import MaskedInput from 'react-text-mask'


export const FormProfile = () => {

    const [HandledInputChange, {nombre, apellido, edad, fecha, correo, usuario, direccion, pais, ciudad, numero, contrasena, confirmar}] = useForm({
        nombre: '', 
        apellido: '', 
        edad: '',
        fecha: '',
        correo: '',
        usuario: '', 
        direccion: '', 
        pais: '', 
        ciudad: '', 
        numero: '',
        contrasena: '', 
        confirmar: ''
    })

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <div class="card mb-3">
                        <h5 class="card-header bg-dark text-white">Información personal</h5>
                        <div class="card-body">
                            <form className = 'needs-validation'>
                                <div className="row">s
                                    <div className="col form-group">
                                        <label>Nombre</label>
                                        <input name = 'nombre' type="text" onChange = {HandledInputChange} value = {nombre} placeholder = 'Juan' className = 'form-control' />
                                    </div>

                                    <div className="col form-group">
                                        <label>Apellido</label>
                                        <input name = 'apellido' type="text" onChange = {HandledInputChange} value = {apellido} placeholder = 'Taveras' className = 'form-control' />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col form-group">
                                        <label>Edad</label>
                                        <input name = 'edad' type="text" onChange = {HandledInputChange} value = {edad} placeholder = '25' className = 'form-control' />
                                    </div>

                                    <div className="col form-group">
                                        <label>Fecha de nacimiento</label>
                                        <input name = 'fecha' type="date" onChange = {HandledInputChange} value = {fecha} placeholder = '26/8/1996' className = 'form-control' />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col form-group">
                                        <label>Correo Electrónico</label>
                                        <input name = 'correo' type="text" onChange = {HandledInputChange} value = {correo} placeholder = 'Juan123@hotmail.com' className = 'form-control' />
                                    </div>

                                    <div className="col form-group">
                                        <label>Nombre de usuario</label>
                                        <input name = 'usuario' type="text" onChange = {HandledInputChange} value = {usuario} placeholder = 'Juan123' className = 'form-control' />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col form-group">
                                        <label>Dirección</label>
                                        <input name = 'direccion' type="text" onChange = {HandledInputChange} value = {direccion} placeholder = 'Los Santos' className = 'form-control' />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col form-group">
                                        <label>País</label>
                                        <input name = 'pais' type="text" onChange = {HandledInputChange} value = {pais} placeholder = 'República Dominicana' className = 'form-control' />
                                    </div>

                                    <div className="col form-group">
                                        <label>Ciudad</label>
                                        <input name = 'ciudad' type="text" onChange = {HandledInputChange} value = {ciudad} placeholder = 'Bonao' className = 'form-control' />
                                    </div>

                                    <div className="col form-group">
                                        <label cl>Numero de teléfono</label>
                                        <MaskedInput
                                            name = 'numero'
                                            value = {numero}
                                            onChange = {HandledInputChange}
                                            className = 'form-control'
                                            placeholder = '(809)-222-3333'
                                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col form-group">
                                        <label>Contrasena</label>
                                        <input name = 'contrasena' type="text" onChange = {HandledInputChange} value = {contrasena} placeholder = '********' className = 'form-control' />
                                    </div>


                                    <div className="col form-group">
                                        <label>Confirmar Contrasena</label>
                                        <input name = 'confirmar' type="text" onChange = {HandledInputChange} value = {confirmar} placeholder = '********' className = 'form-control' />
                                    </div>
                                </div>
                            </form>
                            <button className = 'btn btn-primary form-control'>Guardar</button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <ProfileImg />
                </div>
            </div>
        </>
    )
}