import { NewsData, NewsAction, NewsActionTypes } from "../types/newsTypes"

const defaultState = null

const newsReducer = (state: NewsData[] | null = defaultState, action: NewsAction): NewsData[] | null => {
    switch (action.type) {
        case NewsActionTypes.FETCH_NEWS_DATA: return action.payload
        default: return state
    }
}

export default newsReducer