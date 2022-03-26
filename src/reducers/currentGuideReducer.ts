import { CurrentGuideData, CurrentGuideActionTypes, CurrentGuideAction } from "../types/currentGuideTypes"

const defaultState: CurrentGuideData | null = null

const currentGuideReducer = (state: CurrentGuideData | null = defaultState, action: CurrentGuideAction): CurrentGuideData | null => {
    switch (action.type) {
        case CurrentGuideActionTypes.SET_CURRENT_GUIDE: return action.payload
        default: return state
    }
}

export default currentGuideReducer