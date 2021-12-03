import { ADD_TO_CART } from '../types';

const initialState = {
    cartItems: []
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        default:
            return state;
    }
}

export default CartReducer;