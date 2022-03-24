import * as PersonalActionCreators from "./personalActions"
import * as NewsActionCreators from "./newsActions"

const ActionCreators = {
    ...PersonalActionCreators,
    ...NewsActionCreators
}

export default ActionCreators