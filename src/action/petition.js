import { fetchConToken, fetchSinToken } from "../helper/fetch"
import { Types } from "../types/Types"
import Swal from 'sweetalert2'
import moment from "moment"

export const startGetPetitionesUser = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth
        const {PeticionesUser} = getState().pt

        const resp = await fetchSinToken('peticionesUser')
        const body = await resp.json()

        if(body.ok) {
          const MPetitions = PeticionesUser?.filter(p => p.user?.id === uid)
          dispatch(PetitionesUser(body.peticionesUser))
          dispatch(MyPetitions(MPetitions))
        }
    }
}

const MyPetitions = (peticiones) => ({
  type: Types.ptgetMyPetitions,
  payload: peticiones
})

const PetitionesUser = (peticiones) => ({
    type: Types.ptgetPetitionesUser,
    payload: peticiones
})

export const startGetPetitions = () => {
    return async(dispatch) => {

        const resp = await fetchSinToken('peticion')
        const body = await resp.json()

        if(body.ok) {
          dispatch(Petitions(body.peticiones))
        }
    }
}

const Petitions = (peticiones) => ({
    type: Types.ptgetPetitions,
    payload: peticiones
})

export const startCreatePetition = (name, number, descripcion) => {
    return async(dispatch) => {

        const date = moment()
        const title = 'Usuario sin cuenta'

        console.log(name, number, descripcion)

        const resp = await fetchConToken('peticionSinCuenta', {title, name, number, date, descripcion}, 'POST');
        const body = await resp.json()

        if (body.ok) {

            dispatch(createPetition(body))
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
                title: 'Petici??n creada correctamente'
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

export const startCreatePetitionUser = (name, title, descripcion) => {
    return async(dispatch, getState) => {
        const {uid, users} = getState().auth

        const numberuser = users?.find(user => user.id === uid)

        const number = numberuser?.number

        const date = moment()
        const resp = await fetchConToken('peticionesUser', {title, name, number, date, descripcion}, 'POST');
        const body = await resp.json()

        if (body.ok) {

            dispatch(createPetition(body))
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
                title: 'Petici??n creada correctamente'
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

const createPetition = (petition) => ({
    type: Types.ptCreatePetition,
    payload: petition
})

export const setPetition = (petition) => ({
    type: Types.ptSetPetition,
    payload: petition
})

export const setPetitionUser = (petition) => ({
    type: Types.ptSetPetitionUser,
    payload: petition
})


export const startUpdatePetition = (name, title, descripcion) => {
    return async(dispatch, getState) => {

        const {activePetitionsUser} = getState().pt

        const {date, number} = activePetitionsUser
  
        const resp = await fetchConToken(`peticionesUser/${activePetitionsUser._id}`, {name, title, descripcion, date, number}, 'PUT');
        const body = await resp.json()

        if (body.ok) {

            dispatch(updatePetition(body.peticion))
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
                title: 'Petici??n actualizada correctamente'
              })
        } else {
            console.log(body.errors)
            Swal.fire('Error', body.errors, 'error')
        }

    }
}

const updatePetition = (peticiones) => ({
    type: Types.ptUpdatePetition,
    payload: peticiones
})

export const startDeletePetition = () => {
    return async(dispatch, getState) => {
        const {activePetitionsUser} = getState().pt

        const resp = await fetchConToken(`peticionesUser/${activePetitionsUser._id}`, activePetitionsUser, 'DELETE')

        if(resp.ok) {
            dispatch(deletePetition(activePetitionsUser))
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
                title: 'Petici??n eliminada correctamente'
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
            title: resp.msg
          })
        }
    }

}

const deletePetition = (peticiones) => ({
    type: Types.ptDeletePetition,
    payload: peticiones
})