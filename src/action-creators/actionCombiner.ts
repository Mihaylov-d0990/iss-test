import * as PersonalActionCreators from "./personalActions"
import * as NewsActionCreators from "./newsActions"
import * as NewsFormActionCreators from "./newsFormActions"

const ActionCreators = {
    ...PersonalActionCreators,
    ...NewsActionCreators,
    ...NewsFormActionCreators
}

export default ActionCreators