import { createStore, combineReducers, applyMiddleware} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import personalReducer from "../reducers/personalReducer"
import newsReducer from "../reducers/newsReducer"

export const rootReducer = combineReducers({
    personal: personalReducer,
    news: newsReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
