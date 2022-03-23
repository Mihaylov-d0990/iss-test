import { PersonalData, PersonalActionTypes, PersonalAction } from "../types/personalTypes"

let defaultState: PersonalData = {
    name: "Default Default Default",
    email: "Default",
    photo: null
}

const personalReducer = (state: PersonalData = defaultState, action: PersonalAction): PersonalData => {
    switch (action.type) {
        case PersonalActionTypes.FETCH_PERSONAL_DATA: return action.payload
        default: return state
    }
}

export default personalReducer