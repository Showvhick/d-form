import { types } from "@proj/static";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface InitialState {
    isLoading:boolean
    form?:types.fieldTypes.IForm
    fieldValues?:types.fieldTypes.IFieldValues
    timeout?:number
    isTimedOut?:boolean,
    isSubmitting?:boolean,
    isSubmitted?:boolean,
    submissionError?:string|null
}


const initialState:InitialState = {
    isLoading:false
}

export const formSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getForm:(state) =>{
            return {
                ...state,
                isLoading:true
            }
        },
        getFormSuccess:(state,action:PayloadAction<types.fieldTypes.IForm>)=>{
            let newTimeout:number = 0;
            if(action.payload.timeout){
                let timeout = window.localStorage.getItem("timeout");
                if(!timeout){
                    newTimeout = moment().add(action.payload.timeout,"seconds").unix();
                    window.localStorage.setItem("timeout",newTimeout.toString())
                }
                else{
                    newTimeout = parseInt(timeout)
                }
            }
            
            return {
                ...state,
                isLoading:false,
                form:action.payload,
                timeout:newTimeout
            }
        },
        onchangeFieldValues:(state,action:PayloadAction<{key:string,value:types.fieldTypes.TFieldValue}>) => {
            let fieldValues = state.fieldValues?{...state.fieldValues}: {}
            fieldValues[action.payload.key] = action.payload.value;
            return {
                ...state,
                fieldValues
            }

        },

        onTimeoutForm:(state) => {
            window.localStorage.removeItem("timeout");
            window.localStorage.removeItem("persist:root");
            return {
                ...state,
                timeout:0,
                form:undefined,
                fieldValues:undefined,
                isTimedOut:true
            }
        },

        submitForm:(state,action:PayloadAction<types.fieldTypes.IFieldValues>) => {
            return {
                ...state,
                isSubmitting:true
            }
        },

        submitSuccess:(state) => {
            return {
                ...state,
                isSubmitting:false,
                isSubmitted:true,
                form:undefined,
                fieldValues:undefined,
                submissionError:null
            }
        },

        submitFailed:(state,action:PayloadAction<string>) => {
            return {
                ...state,
                isSubmitting:false,
                isSubmitted:false,
                submissionError:action.payload
            }
        }
    }
})

export const {
    getForm,
    getFormSuccess,
    onchangeFieldValues,
    onTimeoutForm,
    submitForm,
    submitSuccess,
    submitFailed
} = formSlice.actions;
export default formSlice.reducer;