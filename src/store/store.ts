import { createStore, combineReducers, applyMiddleware} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import personalReducer from "../reducers/personalReducer"
import newsReducer from "../reducers/newsReducer"
import newsFormReducer from "../reducers/newsFormReducer"
import guideFormReducer from "../reducers/guideFormReducer"
import currentGuideReducer from "../reducers/currentGuideReducer"
import controlReducer from "../reducers/controlReducer"
import controlFormReducer from "../reducers/controlFormReducer"
import employeeReducer from "../reducers/employeeReducer"
import windowReducer from "../reducers/windowReducer"

export const rootReducer = combineReducers({
    personal: personalReducer,
    news: newsReducer,
    newsForm: newsFormReducer,
    guideForm: guideFormReducer,
    currentGuide: currentGuideReducer,
    control: controlReducer,
    controlForm: controlFormReducer,
    employees: employeeReducer,
    windowOpen: windowReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
