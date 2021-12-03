import { INIT_STATE, INPUT_FIELD, INIT_USER, expired_date, SET_ADDRESS } from '../types';
import { EXPIRE_DATE_ERROR } from '../../config/errorMessages';

const initialState = {
    userID: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    photo: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    expired_date: "",
    isDefault: "",
    selectedAddress: 0
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_STATE:
            return {
                email: "",
                password: "",
                confirmPassword: "",
                name: "",
                phone: "",
                photo: "",
                cardNumber: "",
            };

        case INPUT_FIELD:
            return {
                ...state,
                [action.payload.state]: action.payload.value
            };

        case INIT_USER:
            console.log('HOLA INTERNO')
            return {
                ...state,
                userID: action.payload.userID ? action.payload.userID : state.userID,
                email: action.payload.email ? action.payload.email : state.email,
                name: action.payload.name ? action.payload.name : state.name,
                phone: action.payload.phoneNumber ? action.payload.phoneNumber : state.phone,
                photo: action.payload.userPhoto ? action.payload.userPhoto : state.photo,
                address: action.payload.address ? action.payload.address : state.address,
                paymentMethods: action.payload.paymentMethods ? action.payload.paymentMethods : state.paymentMethods,
                password: "",
                confirmPassword: "",
                cardNumber: "",
            }

        case EXPIRE_DATE_ERROR:
            return {
                ...state,
                expired_date: action.payload
            }
        case SET_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;