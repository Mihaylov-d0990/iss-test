import { PersonalData, PersonalActionTypes, PersonalAction } from "../types/personalTypes"

let defaultState: PersonalData = {
    name: "Default Default Default",
    email: "Default",
    photoId: null,
    photoUrl: null
}

const personalReducer = (state: PersonalData = defaultState, action: PersonalAction): PersonalData => {
    switch (action.type) {
        case PersonalActionTypes.FETCH_PERSONAL_DATA: return action.payload
        case PersonalActionTypes.FETCH_IMAGE: return {...state, ...action.payload}
        default: return state
    }
}

export default personalReducer