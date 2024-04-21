import { Response } from "express";
import { ZodError } from "zod";
import {AxiosError} from 'axios';

const STATUS_CODES = {
    internalServerError:500,
    badData:400,
    permissionDenied:403
}

type ErrorResponse = {
    statusCode:number,
    message:string
}

class RequestError {
    message:string
    statusCode:number
    constructor(message:string,statusCode:number,){
        this.message = message;
        this.statusCode = statusCode;
    }

    getErrorResponse(){
        return {
            statusCode:this.statusCode,
            message:this.message
        }
    }
}

class PermissionDenied extends RequestError {
    constructor(){
        super("Permission Denied",401);
    }
}

class AccessDenied extends RequestError {
    constructor(){
        super("Access Denied",403);
    }
}

class Errors {
    error:any
    constructor(error:any){
        this.error = error;
    }

    sendResponse(res:Response){
        console.log(this.error);
        if(this.error instanceof ZodError){
            res.status(STATUS_CODES.badData).json(this.error.format());
        }
        else if(this.error instanceof AxiosError){
            let statusCode = this.error.code;
            let message = this.error.response?.data || statusCode;

            res.status(STATUS_CODES.internalServerError).json({
                message:message
            })
        }
        else if(this.error instanceof RequestError){
            let errorResponse:ErrorResponse = this.error.getErrorResponse();
            res.status(errorResponse.statusCode).json({
                message:errorResponse.message
            })
        }
        else{
            res.status(STATUS_CODES.internalServerError).json({
                message:this.error
            })
        }
    }
}


export default Errors;
export {
    RequestError,
    PermissionDenied,
    AccessDenied,
    STATUS_CODES
}