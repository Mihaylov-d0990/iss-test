// Personal types 

export interface PersonalData {
    name: string,
    email: string,
    photo?: string | null
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