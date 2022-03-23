// Personal types 

export interface FullName {
    name: string,
    surname: string,
    lastname: string
}

export interface PersonalData {
    name: FullName,
    email: string
}

export enum PersonalActionTypes {
    FETCH_PERSONAL_DATA = "FETCH_PERSONAL_DATA"
}

export interface fetchPersonalDataAction {
    type: PersonalActionTypes.FETCH_PERSONAL_DATA,
    payload: PersonalData
}

export type PersonalAction = fetchPersonalDataAction

//