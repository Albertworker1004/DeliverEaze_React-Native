import { INIT_STATE, INPUT_FIELD, INIT_USER, CARD_EXPIRED_DATE, SET_ADDRESS } from '../types';
import { EXPIRE_DATE_ERROR } from '../../config/errorMessages';
import { AsyncStorage } from 'react-native';

export const initState = () => {
    return {
        type: INIT_STATE
    };
}

export const inputField = (state, value) => {
    return {
        type: INPUT_FIELD,
        payload: {
            state: state,
            value: value,
        }
    };
}

export const initUser = user => {
    console.log(user)
    let promises = []
    promises.push(AsyncStorage.setItem('userName', user.name))
    promises.push(AsyncStorage.setItem('userPhoneNumber', user.phoneNumber))
    promises.push(AsyncStorage.setItem('userID', user.userID))
    promises.push(AsyncStorage.setItem('userPhoto', user.userPhoto))
    promises.push(AsyncStorage.setItem('userEmail', user.email))
    
    console.log('HOLA ANTES')
    return {
        type: INIT_USER,
        payload: user
    };
}

export const cardExpiredDate = date => {
    return {
        type: EXPIRE_DATE_ERROR,
        payload: date
    };
}

export const setAddress = (address) => {
    return {
        type: SET_ADDRESS,
        payload: address
    }
}