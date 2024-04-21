import z, { ZodRawShape, ZodString, ZodStringCheck, ZodType } from 'zod';
import form from '../../data/form';
import { types } from '@proj/static';

export const validateSubmission = (data:any) => {
    let obj:ZodRawShape = {}
    form.steps?.forEach(step=>{
        
        step.fields?.forEach(field=>{
            let fieldZodType:ZodType = 
            [types.fieldTypes.EFieldType.TEXT,types.fieldTypes.EFieldType.TEXTAREA,types.fieldTypes.EFieldType.DROPDOWN].includes(field.type)?z.string()
            :field.type === types.fieldTypes.EFieldType.MULTIPLE_CHOICES?z.array(z.string())
            :field.type === types.fieldTypes.EFieldType.SINGLE_CHOICE?z.string().or(z.number())
            :z.string();

            if(fieldZodType){
                if(!field.mandatory){
                    fieldZodType = fieldZodType.optional()
                }
            }

            obj[field.id] = fieldZodType
        })
    })

    const schema = z.object(obj);
    let result = schema.parse(data);
    return result
}