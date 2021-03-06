import { Types } from '../types/Types';

const initialState = {
    checking: true,
    users: [],
    activeUser: '',
    forgotPassword: ''
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
            
        case Types.authStartRegister:
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            }

        case Types.authStartGetUsers:
            return {
                ...state,
                users: action.payload
            }

        case Types.authStartUpdateUser:
            return {
                ...state,
                users: state.users.map(
                    e => (e.id ===  action.payload.id) ? action.payload : e
                )
            }
        case Types.authSetUser:
            return {
                ...state,
                activeUser: action.payload
            }

        case Types.authForgotPassword:
            return {
                ...state,
                forgotPassword: action.payload
            }

        case Types.authCheckingFinish:
            return {
                ...state,
                checking: false,
            }

        case Types.authLogout:
            return {
                checking: false,
            }
    
        default:
            return state;
    }
}
