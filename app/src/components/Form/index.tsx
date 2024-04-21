import { types } from "@proj/static";
import React, { useState } from "react";
import Field from "../Field";
import { Button } from "@mui/material";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as formActions from '../../redux/slices/form.slice';

interface IProps {
  data: types.fieldTypes.IForm;
}

export default function Form(props: IProps) {
    let { data } = props;
    const [currentStep, setCurrentStep,] = useState<number>(0);
    const {fieldValues, isSubmitting} = useAppSelector(state=>state.form);
    const [isFormTouched,setIsFormTouched] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onFieldChange = (id:string,value:types.fieldTypes.TFieldValue) => {
        dispatch(formActions.onchangeFieldValues({
            key:id,
            value
        }))
    }

    const onNext = () => {
        setIsFormTouched(true);
        if(!isFormError()){
            setCurrentStep(currentStep+1);
            setIsFormTouched(false);
        }
    }

    const isFormError = ():boolean => {
        let isError:boolean = false;
        let mandatoryFields:types.fieldTypes.IField[] = data.steps[currentStep]?.fields?.filter(s=>s.mandatory) || [];
        for(let field of mandatoryFields){
            if(field.type === types.fieldTypes.EFieldType.MULTIPLE_CHOICES){
                if(!(fieldValues?.[field.id] && typeof fieldValues?.[field.id] === "object" && Array.isArray(fieldValues?.[field.id]))){
                    isError = true;
                    break;
                }
            }
            else if(!(fieldValues?.[field.id] && fieldValues?.[field.id] !== "")){
                isError = true;
                break;
            }
        }
        return isError
    }

    const BackButton = () => {
        return (
            <Button 
                style={{marginRight:"10px"}}
                onClick={() => setCurrentStep(currentStep - 1)}
            >
                Back
            </Button>
        )
    }

    const submitForm = () => {
        setIsFormTouched(true);
        if(!isFormError()){
            if(fieldValues){
                dispatch(formActions.submitForm(fieldValues));
            }
            setIsFormTouched(false);
        }
    }


    const step = data.steps[currentStep];
    return (
        <div className="form-container">
        <h2>{step.title}</h2>
        {step.fields.map((field,i) => {
            return (
                <Field 
                    key={`field-${field.id}-${i}`}
                    field={field} 
                    isError={isFormTouched && !(fieldValues?.[field.id] && fieldValues?.[field.id] !== "")?true:false}
                    value={fieldValues?.[field.id]}
                    onChange={(val:types.fieldTypes.TFieldValue)=>onFieldChange(field.id,val)}
                />
            );
        })}
        {currentStep < data.steps.length - 1 ? (
            <div style={{ display: "flex", width: "100%", justifyContent:"flex-end", marginTop:"20px" }}>
            {
                currentStep > 0 ? (
                    <BackButton />
                ) 
                : 
                null
            }
            <Button
                variant="contained"
                onClick={() => onNext()}
            >
                Next
            </Button>
            </div>
        ) : (
            <div style={{ display: "flex", width: "100%", justifyContent:"flex-end", marginTop:"20px" }}>
            <BackButton />
            <Button
                variant="contained"
                onClick={()=>submitForm()}
                disabled={isSubmitting}
            >
            {
                isSubmitting?
                "Please wait...":"Submit"
            }
            </Button>
            </div>
        )}
        </div>
    );
}
