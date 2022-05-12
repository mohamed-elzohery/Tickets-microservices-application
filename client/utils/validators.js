const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[A-Za-z]\w*$/;

export const validateName = (val) => {
    let name = val.toString().trim();
    if(name === '' ) return {isValid: false, msg: 'Name is required'};
    if(name.length < 3 ) return {isValid: false, msg: 'Name is less than 3 chars'};
    if(name.length > 30 ) return {isValid: false, msg: 'Name is longer than 30 chars'};
    if(!name.match(usernameRegex)) return {isValid: false, msg: 'Name is not valid'};
    return {isValid: true}
}

export const validateEmail = (val) => {
    let email = val.toString().trim().toLowerCase();
    if(email === '' ) return {isValid: false, msg: 'Email is required'};
    if(!email.match(emailRegex)) return {isValid: false, msg: 'Eamil is not valid'};
    return {isValid: true}
}

export const validatePassword = (val) => {
    let password = val.toString().trim().toLowerCase();
    if(password === '' ) return {isValid: false, msg: 'Password is required'};
    if(password.length < 8 ) return {isValid: false, msg: 'Name is less than 8 chars'};
    return {isValid: true}
}
