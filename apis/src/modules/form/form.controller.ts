import Errors from '../../common/error';
import {Request, Response, Router} from 'express';
import FormServices from "./form.services";
import * as formValidator from './form.validate';

let formServices = new FormServices();

class FormController {
    async getForm(req:Request,res:Response){
        try{
            let formData = await formServices.getForm();
            res.status(200).json(formData);
        }
        catch(err){
            let error = new Errors(err);
            return error.sendResponse(res)
        }
    }

    async submitForm(req:Request,res:Response){
        try{
            let data = req.body.fieldValues;
            formValidator.validateSubmission(data);
            let formData = await formServices.submitForm(data);
            res.status(200).json(formData);
        }
        catch(err){
            let error = new Errors(err);
            return error.sendResponse(res)
        }
    }
}

export default FormController;