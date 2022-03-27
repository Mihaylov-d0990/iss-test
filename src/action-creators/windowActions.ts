import { Dispatch } from "react"
import { WindowAction, WindowActionTypes } from "../types/windowTypes"

export const setWindow = (open: boolean) => {
    return async (dispatch: Dispatch<WindowAction>) => dispatch({type: WindowActionTypes.SET_WINDOW_DATA, payload: open})
}