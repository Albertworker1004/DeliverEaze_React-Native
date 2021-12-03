export const validateEmail = email => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) === false) {
        return "Email is Not Correct";
    }
    else {
        return "";
    }
}