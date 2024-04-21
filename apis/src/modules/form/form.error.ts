import { RequestError, STATUS_CODES } from "../../common/error";

class FormNotFound extends RequestError {
    constructor(message:string="Form not found",statusCode:number=STATUS_CODES.badData){
        super(message,statusCode)
    }
}


export {
    FormNotFound
}