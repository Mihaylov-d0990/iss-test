import { GuideFormData, GuideFormActionTypes, GuideFormAction } from "../types/guideFormTypes"

const defaultState: GuideFormData[] = [{
    id: "",
    name: ""
}]

const guideFormReducer = (state: GuideFormData[] = defaultState, action: GuideFormAction): GuideFormData[] => {
    switch (action.type) {
        case GuideFormActionTypes.SET_GUIDE_FORM_DATA: return action.payload
        default: return state
    }
}

export default guideFormReducer