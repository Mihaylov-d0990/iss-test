import { NewsFormData, NewsFormActionTypes, NewsFormAction } from "../types/newsFormTypes"

const defaultState: NewsFormData = {
    id: "",
    title: "",
    content: "",
    link: "",
    file: "",
    fileId: ""
}

const newsFormReducer = (state: NewsFormData = defaultState, action: NewsFormAction): NewsFormData => {
    switch (action.type) {
        case NewsFormActionTypes.SET_NEWS_FORM_DATA: return action.payload
        default: return state
    }
}

export default newsFormReducer