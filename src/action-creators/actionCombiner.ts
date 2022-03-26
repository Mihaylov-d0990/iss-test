import * as PersonalActionCreators from "./personalActions"
import * as NewsActionCreators from "./newsActions"
import * as NewsFormActionCreators from "./newsFormActions"
import * as GuideFormActionCrators from "./guideFormActions"
import * as CurrentGuideActionCreators from "./currentGuideActions"
import * as ControlActionCreators from "./controlActions"
import * as ControlFormActionCreators from "./controlFormActions"

const ActionCreators = {
    ...PersonalActionCreators,
    ...NewsActionCreators,
    ...NewsFormActionCreators,
    ...GuideFormActionCrators,
    ...CurrentGuideActionCreators,
    ...ControlActionCreators,
    ...ControlFormActionCreators
}

export default ActionCreators