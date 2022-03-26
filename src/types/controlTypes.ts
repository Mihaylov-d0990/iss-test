// Control types 

export interface ControlData {
    id: string,
    name: string,
    department: string,
    phone: string,
    email: string,
    password: string
}

export enum ControlActionTypes {
    SET_CONTROL_DATA = "SET_CONTROL_DATA"
}

export interface setControlAction {
    type: ControlActionTypes.SET_CONTROL_DATA,
    payload: ControlData[] | null
}

export type ControlAction = setControlAction