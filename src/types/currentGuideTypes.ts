// Guide form types 

export interface CurrentGuideData {
    guide: string,
    name: string,
    expandable: boolean
}

export enum CurrentGuideActionTypes {
    SET_CURRENT_GUIDE = "SET_CURRENT_GUIDE"
}

export interface setCurrentGuideAction {
    type: CurrentGuideActionTypes.SET_CURRENT_GUIDE,
    payload: CurrentGuideData | null
}

export type CurrentGuideAction = setCurrentGuideAction