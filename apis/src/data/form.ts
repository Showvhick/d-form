import { types } from "@proj/static"


const form:types.fieldTypes.IForm = {
    steps:[
        {
            title:"Step 1",
            fields:[
                {
                    label: "Name",
                    type: types.fieldTypes.EFieldType.TEXT,
                    id: "name",
                    mandatory:true
                }
            ]
        },
        {
            title:"Step 2",
            fields:[
                {
                    label: "Profession",
                    type: types.fieldTypes.EFieldType.DROPDOWN,
                    id: "profession",
                    options:[
                        {
                            label:"Owner",
                            value:"Owner"
                        },
                        {
                            label:"Agent",
                            value:"Agent"
                        },
                        {
                            label:"Buyer",
                            value:"Buyer"
                        },
                        {
                            label:"Seller",
                            value:"Seller"
                        },
                        {
                            label:"Other",
                            value:"Other"
                        }
                    ],
                    customInputAllowed:true,
                    customInputOnlyIfValueIs:"Other"
                },
                {
                    label:"What service do you need?",
                    type:types.fieldTypes.EFieldType.TEXTAREA,
                    id:"service_required"
                }
            ]
        },
        {
            title:"Step 3",
            fields:[
                {
                    label:"Gender",
                    type: types.fieldTypes.EFieldType.SINGLE_CHOICE,
                    id:"gender",
                    options:[
                        {
                            label:"Male",
                            value:"male"
                        },
                        {
                            label:"Female",
                            value:"female"
                        }
                    ]
                },
                {
                    label:"Countries",
                    type: types.fieldTypes.EFieldType.MULTIPLE_CHOICES,
                    id:"countries",
                    options:[
                        {
                            label:"Abcd",
                            value:"abcd"
                        },
                        {
                            label:"Deff",
                            value:"def"
                        }
                    ]
                }
            ]
        }
    ],
    timeout:60
}

export default form;