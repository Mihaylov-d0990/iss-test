// Window types 

export interface Window {
    modalOpen: boolean
}

export enum WindowActionTypes {
    SET_WINDOW_DATA = "SET_WINDOW_DATA"
}

export interface WindowActions {
    type: WindowActionTypes.SET_WINDOW_DATA,
    payload: boolean
}


export type WindowAction = WindowActions