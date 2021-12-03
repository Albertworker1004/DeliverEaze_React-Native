import { ADD_CARD } from '../types';

const initialState = {
    cards: [
        {
            account_name: "",
            card_number: "",
            expired_date: "",
            cvv: "",
            isDefault: ""
        }
    ],
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default paymentReducer;