import Form from '../../data/form';
import * as formErrors from "./form.error";
import fs from "fs";
import { uuid } from 'uuidv4';
import { homedir } from 'os';
import path from 'path';


class FormServices {
    async getForm(){
        if(!Form){
            throw formErrors.FormNotFound;
        }
        return Form;
    }

    async submitForm(data:object){
        console.log(JSON.stringify(data));
        let submissionPath = path.join(homedir(), 'submissions');
        if(!fs.existsSync(submissionPath)){
            fs.mkdirSync(submissionPath);
        }
        fs.writeFileSync(`${submissionPath}/${uuid()}.json`,JSON.stringify(data));
        return;
    }
}

export default FormServices