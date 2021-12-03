import { EMAIL_DUPLICATE, USER_NOT_FOUND, INVALID_PASSWORD } from '../config/errorMessages';

export const response = code => {
    switch (code) {
        case 601: {
            return EMAIL_DUPLICATE;
        }
        case 602: {
            return INVALID_PASSWORD;
        }
        case 603: {
            return USER_NOT_FOUND;
        }
    }
}