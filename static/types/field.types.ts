type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum EFieldType {
    TEXT="TEXT",
    TEXTAREA="TEXTAREA",
    MULTIPLE_CHOICES="CHOICES",
    SINGLE_CHOICE="SINGLE_CHOICE",
    DROPDOWN="DROPDOWN"
}

export type TFieldOption = {
    label?:string,
    value:string | number
}

export interface IField {
    type:EFieldType,
    label:string,
    id:string,
    options?:TFieldOption[],
    mandatory?:boolean
    customInputAllowed?:boolean,
    customInputOnlyIfValueIs?:string|number|boolean
}


export type TStep = {
    title:string,
    fields:IField[]
}

export interface IForm {
    steps: TStep[],
    timeout?: number
}

export type TFieldValue = string|number|boolean|string[]

export interface IFieldValues {
    [key:string]:TFieldValue
}