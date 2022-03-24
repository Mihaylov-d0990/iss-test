import { NewsData, NewsAction, NewsActionTypes } from "../types/newsTypes"

const defaultState: NewsData[] = [{
    id: "Default",
    title: "Default",
    content: "Default",
    createdAt: "Default",
    fileId: null
}]

const newsReducer = (state: NewsData[] = defaultState, action: NewsAction): NewsData[] => {
    switch (action.type) {
        case NewsActionTypes.FETCH_NEWS_DATA: return action.payload
        default: return state
    }
}

export default newsReducer