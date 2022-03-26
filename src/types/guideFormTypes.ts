// Guide form types 

export interface GuideFormData {
    id: string,
    name: string 
}

export enum GuideFormActionTypes {
    SET_GUIDE_FORM_DATA = "SET_GUIDE_FORM_DATA"
}

export interface setGuideFormAction {
    type: GuideFormActionTypes.SET_GUIDE_FORM_DATA,
    payload: GuideFormData[]
}

export type GuideFormAction = setGuideFormAction