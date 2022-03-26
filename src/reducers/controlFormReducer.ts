import { ControlFormData, 
        ControlFormDepartmentData, 
        ControlFormPositionData, 
        ControlFormActionTypes, 
        ControlFormAction} from "../types/controlFormTypes"

const defaultPosition: ControlFormPositionData = {
    id: "",
    name: ""
}

const defaultDepartment: ControlFormDepartmentData = {
    id: "",
    name: ""
}

const defaultState: ControlFormData = {
    name: "",
    position: [defaultPosition],
    positionId: "",
    email: "",
    phone: "",
    department: [defaultDepartment],
    departmentId: "",
    password: "",
    region: ""
}

const controlFormReducer = (state: ControlFormData = defaultState, action: ControlFormAction): ControlFormData => {
    switch (action.type) {
        case ControlFormActionTypes.SET_CONTROL_FORM_DATA: return action.payload
        default: return state
    }
}

export default controlFormReducer