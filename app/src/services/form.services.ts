import { types } from "@proj/static";
import http from "../utils/http";

export const getForm = async() => {
    let result = await http().get(`/form`);
    return result.data;
}

export const submitForm = async(data:types.fieldTypes.IFieldValues) => {
    let payload = {
        fieldValues:data
    }
    let result = await http().post(`/form`,payload);
    return result.data;
}