class ErrorResponse implements Error{
    code: number;
    name: string;
    message: string;
    keyValue: string;
    constructor(code: number, message: string, name: string, keyValue: string = ''){
        this.code = code;
        this.name = name;
        this.message = message;
        this.keyValue = keyValue;
    }

}

export {ErrorResponse};