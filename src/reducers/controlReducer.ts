import { ControlData, ControlActionTypes, ControlAction } from "../types/controlTypes"

const defaultState: ControlData | null = null

const controlReducer = (state: ControlData[] | null = defaultState, action: ControlAction): ControlData[] | null => {
    switch (action.type) {
        case ControlActionTypes.SET_CONTROL_DATA: return action.payload
        default: return state
    }
}

export default controlReducer