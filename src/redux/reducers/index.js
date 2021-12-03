import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import PaymentReducer from './paymentReducer';
import CartReducer from './cartReducer';

export default combineReducers({
    auth: AuthReducer,
    payment: PaymentReducer,
    cart: CartReducer
});