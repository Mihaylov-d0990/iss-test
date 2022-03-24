// Personal types 

export interface PersonalData {
    name: string,
    email: string,
    photoId?: string | null,
    photoUrl?: string | null
}

export interface ImageData {
    photoUrl: string | null
}

export enum PersonalActionTypes {
    FETCH_PERSONAL_DATA = "FETCH_PERSONAL_DATA",
    FETCH_IMAGE = "FETCH_IMAGE"
}

export interface fetchPersonalDataAction {
    type: PersonalActionTypes.FETCH_PERSONAL_DATA,
    payload: PersonalData
}

export interface fetchImageAction {
    type: PersonalActionTypes.FETCH_IMAGE,
    payload: ImageData
}

export type PersonalAction = fetchPersonalDataAction | fetchImageAction