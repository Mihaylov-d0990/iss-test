import { WindowAction, WindowActionTypes } from "../types/windowTypes"

const defaultState: boolean = false

const windowReducer = (state: boolean = defaultState, action: WindowAction): boolean=> {
    switch (action.type) {
        case WindowActionTypes.SET_WINDOW_DATA: return action.payload
        default: return state
    }
}

export default windowReducer