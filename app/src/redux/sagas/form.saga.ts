import { takeEvery,put, call, takeLatest } from "redux-saga/effects";
import * as formSlices from '../slices/form.slice';
import {types} from '@proj/static';
import * as formServices from '../../services/form.services';

export type SAGA_ACTION = {
    type: string;
    payload: any;
};

function* getForm(){
    try{
        let result:types.fieldTypes.IForm = yield(call(formServices.getForm));
        yield put(formSlices.getFormSuccess(result));
    }
    catch(err){
        // yield put(User.getUsersFailed({
        //     error:err,
        //     message:"Error Occured"
        // }))
    }
}

function* submitForm(action:SAGA_ACTION){
    try{
        yield(call(formServices.submitForm,action.payload));
        yield put(formSlices.submitSuccess());
    }
    catch(err){
        yield put(formSlices.submitFailed("Error Occured"))
    }
}

function* userSaga(){
    yield takeEvery(formSlices.getForm.type,getForm);
    yield takeLatest(formSlices.submitForm.type, submitForm);
}

export default userSaga;