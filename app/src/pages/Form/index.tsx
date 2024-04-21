import React, { useEffect } from 'react'
import Loader from '../../components/shared/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as formActions from '../../redux/slices/form.slice';
import Form from '../../components/Form';
import RemainingTime from './RemainingTime';
import Message from '../../components/shared/Message'


export default function FormPage() {
    const dispatch = useAppDispatch();
    let {isLoading,form,timeout,isTimedOut,isSubmitted, submissionError} = useAppSelector(state=>state.form);
 
    useEffect(()=>{
        dispatch(formActions.getForm());
    },[dispatch])
    
    const onTimeOut = () => {
        dispatch(formActions.onTimeoutForm())
    }

    if(isLoading){
        return <Loader />
    }

    if(form){
        return (
            <div>
                <Form data={form}/>
                {
                    timeout?
                    <RemainingTime 
                        onTimeout={()=>onTimeOut()}
                    />
                    :null
                }
            </div>
        )
    }
    

    if(isSubmitted){
        if(submissionError && submissionError !== ""){
            return (
                <Message>Submission Failed!</Message>
            )
        }
        return (
            <Message>Form has been submitted successfully!</Message>
        )
    }

    if(isTimedOut){
        return (
            <Message>Sorry! You are timed out!</Message>
        )
    }

    return (
        <Message>Unknown Error Occured</Message>
    )
}
