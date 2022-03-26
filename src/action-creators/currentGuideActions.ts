import { Dispatch } from "react"
import { CurrentGuideAction, CurrentGuideData, CurrentGuideActionTypes } from "../types/currentGuideTypes"

export const updateCurrentGuide = (currentGuide: CurrentGuideData | null, resolve: Function | null) => {
    return (dispatch: Dispatch<CurrentGuideAction>) => {
        dispatch({type: CurrentGuideActionTypes.SET_CURRENT_GUIDE, payload: currentGuide})
        if (resolve) resolve()
    }
}