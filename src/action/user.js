import { fetchConToken, fetchSinToken } from "../helper/fetch"
import {Types} from '../types/Types';
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from "moment";


export const startLogin = (email, password) => {
    return async(dispatch) => {

        const greeting = moment().hour()
        let greet
        if (greeting >= 0 && greeting <= 11) {
            greet = 'ð Buenos dÃ­as'
        } else if (greeting >= 12 && greeting <= 18) {
            greet = 'âï¸ Buenas tardes'
        } else if (greeting >= 19 && greeting <= 23) {
            greet = 'ð Buenas noches'
        }

        const resp = await fetchSinToken('users', {email, password}, 'POST');
        const body = await resp.json();

        console.log(body)
        
        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            await dispatch(login({
                uid: body.uid,
                name: body.name
            }))
            dispatch(setActiveUser())

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                title: `${greet} ${body.name}`
              })             
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}


export const startRegister = (name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password) => {
    return async(dispatch, getState) => {
        const resp = await fetchConToken('users/newUser', {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password}, 'POST');
        const body = await resp.json();

        const {uid, users} = body
        const user = users?.find(user => user.id === uid)

        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

            await dispatch(setActiveUser(user))
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
              })
        }
    }
}

const register = (user) => ({
    type: Types.authStartRegister,
    payload: user
})

export const startGetUsers = () => {
    return async(dispatch, getState) => {
        const resp = await fetchConToken('users');
        const body = await resp.json()

        const {uid, users} = getState().auth

        const user = users?.find(user => user.id === uid)

        if(body.ok) {
            dispatch(getUsers(body.users))
            dispatch(setActiveUser(user))
        }
    }
}

const getUsers = (users) => ({
    type: Types.authStartGetUsers,
    payload: users
})

export const startUpdateUserDate = () => {
    return async(dispatch, getState) => {
        const {activeUser} = getState().auth

        const {name, lastName, age, date, email, address, country, city, number, password, urlImage} = activeUser

        const biliever = false
        const discipleship = false
        const tracking = false

        const resp = await fetchConToken(`users/update/${activeUser.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage}, 'PUT')
        const body = await resp.json()

        console.log(body.users)

        if(body.ok) {
            dispatch(updateUser(body.users))
            dispatch(setActiveUser(body.users))
            
        }
    }
}

export const startUpdateUser = (name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, file) => {
    return async(dispatch, getState) => {
        const {activeUser} = getState().auth

        const token = localStorage.getItem('token') || '';

        if(file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', name)

            if (activeUser?.urlImage) {
                const ress = await axios.delete(`${process.env.REACT_APP_API_URL}/image/upload/${activeUser.idImage}`, {headers: {'x-token': token}})

                if (ress.data.ok) {
                    console.log(ress, 'eliminada esa imagen')
    
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
    
                    if (res.data.ok) {
                        const urlImage = res.data.image.url
                        const idImage = res.data.image.id
                    
                        const resp = await fetchConToken(`users/update/${activeUser.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
                        const body = await resp.json()
    
                        console.log(body.users)
    
                        if(body.ok) {
                            dispatch(updateUser(body.users))
                            dispatch(setActiveUser(body.users))
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                        
                            return Toast.fire({
                                icon: 'success',
                                title: 'Usuario actualizado correctamente'
                            })
                        } else {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            
                            return Toast.fire({
                                icon: 'error',
                                title: `${body.msg}`
                            })
                        }
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        return Toast.fire({
                            icon: 'error',
                            title: `${res.data.msg}`
                        })
                    }
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    
                    return Toast.fire({
                        icon: 'error',
                        title: `${ress.data.msg}`
                    })
                }

            } else{
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData, {headers: {'x-token': token}})
    
                if (res.data.ok) {
                    const urlImage = res.data.image.url
                    const idImage = res.data.image.id
                
                    const resp = await fetchConToken(`users/update/${activeUser.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
                    const body = await resp.json()

                    console.log(body.users)

                    if(body.ok) {
                        dispatch(updateUser(body.users))
                        dispatch(setActiveUser(body.users))
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                    
                        return Toast.fire({
                            icon: 'success',
                            title: 'Usuario actualizado correctamente'
                        })
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        return Toast.fire({
                            icon: 'error',
                            title: `${body.msg}`
                        })
                    }
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    
                    return Toast.fire({
                        icon: 'error',
                        title: `${res.data.msg}`
                    })
                }
            }

            
        } else {
            const urlImage = activeUser.urlImage
            const idImage = activeUser.idImage
            const resp = await fetchConToken(`users/update/${activeUser.id}`, {name, lastName, age, date, email, address, country, city, number, biliever, discipleship, tracking, password, urlImage, idImage}, 'PUT')
            const body = await resp.json()

            console.log(body.users)

            if(body.ok) {
                dispatch(updateUser(body.users))
                dispatch(setActiveUser(body.users))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                return Toast.fire({
                    icon: 'success',
                    title: 'Usuario actualizado correctamente'
                })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                return Toast.fire({
                    icon: 'error',
                    title: `${body.msg}`
                })
            }
        }
    }
}

const updateUser = (user) => ({
    type: Types.authStartUpdateUser,
    payload: user
})

export const ActiverUser = (user) => ({
    type: Types.authSetUser,
    payload: user
})

export const startAuthCheking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('users/renewUser');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({
    type: Types.authCheckingFinish
})


const login = (user) => ({
    type: Types.authLogin,
    payload: user
})


export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')
        dispatch(logout())
        localStorage.removeItem('Show')
    }
}

const logout = () => ({
    type: Types.authLogout
})


export const setActiveUser = () => {
    return async(dispatch, getState) => {

        const {uid, users} = getState().auth

        const user = users?.find(user => user.id === uid)

        dispatch(activeUser(user))
        
    }
}

const activeUser = (user) => ({
    type: Types.authSetUser,
    payload: user
})

export const forgotPassword = (email) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('resetPassword', {email}, 'POST')
        const body = await resp.json()

        localStorage.setItem('tokenn', body.token)
        localStorage.setItem('tokennINIT', (new Date().getTime()))

        if(body.ok) {
            dispatch(forgot(body.token))
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'success',
                title: 'Revisa tu correo electrÃ³nico'
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'error',
                title: `${body.msg}`
            })
        }
    }
}

export const newPassword = (password) => {
    return async(dispatch, getState) => {

        const {users} = getState().auth

        const token = localStorage.getItem('tokenn')

        const tokenTiempo = localStorage.getItem('tokennINIT')

        if (moment(Number(tokenTiempo)).fromNow() === '10 minutes ago' || moment(Number(tokenTiempo)).fromNow() < '10 minutes ago') {
            localStorage.removeItem('tokenn')
            localStorage.removeItem('tokennINIT')
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        
            return Toast.fire({
                icon: 'error',
                title: 'El tiempo para el cambio de contraseÃ±a expirÃ³'
            })
        } else if (token && tokenTiempo) {
            const tokenVerify = users?.find(user => user.tokenUser === token)

            const {email} = tokenVerify

            const resp = await fetchSinToken('resetPassword/new', {password, email}, 'POST')
            const body = await resp.json()

            if (body.ok) {
                localStorage.removeItem('tokenn')
                localStorage.removeItem('tokennINIT')
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            
                return Toast.fire({
                    icon: 'success',
                    title: 'ContraseÃ±a guardada correctamente'
                })
            }
        }

    }
}

const forgot = (token) => ({
    type: Types.authForgotPassword,
    payload: token
})