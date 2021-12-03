import CoreService from './CoreService';
import axios from 'axios';
import config from '../config/server';

export default class AuthService extends CoreService {

    addCard = card => {
        return this.makeRequest('user_add_paymentmethod', {
            method: "post",
            body: JSON.stringify({
                userID: card.userID,
                account_name: card.account_name,
                card_number: card.card_number,
                expire_date: card.expired_date,
                cvv: card.cvv,
                is_default: "YES"
            })
        });
    }

    async requestPayment(paymentInf, callback) {
        var request_pay = config.url + 'request_payment';
        axios.post(request_pay, paymentInf)
            .then(res => {
                const data = res.data;
                if (data) {
                    callback({ isSuccess: true, response: data, message: '' });
                } else {
                    callback({ isSuccess: false, response: data, message: 'Failed to authentication from server' });
                }
            }).catch(error => {
                callback({ isSuccess: false, response: error, message: 'Can\'t find server'});
            });
    }
}