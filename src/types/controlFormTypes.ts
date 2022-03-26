// Control form types 

export interface ControlFormDepartmentData {
    id: string,
    name: string
}

export interface ControlFormPositionData {
    id: string,
    name: string
}

export interface ControlFormData {
    name: string,
    position: ControlFormPositionData[],
    positionId: string,
    email: string,
    phone: string,
    department: ControlFormDepartmentData[],
    departmentId: string,
    password: string,
    region: string
}

export enum ControlFormActionTypes {
    SET_CONTROL_FORM_DATA = "SET_CONTROL_FORM_DATA"
}

export interface setControlFormAction {
    type: ControlFormActionTypes.SET_CONTROL_FORM_DATA,
    payload: ControlFormData
}

export type ControlFormAction = setControlFormAction