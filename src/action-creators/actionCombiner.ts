import * as PersonalActionCreators from "./personalActions"
import * as NewsActionCreators from "./newsActions"
import * as NewsFormActionCreators from "./newsFormActions"
import * as GuideFormActionCrators from "./guideFormActions"
import * as CurrentGuideActionCreators from "./currentGuideActions"

const ActionCreators = {
    ...PersonalActionCreators,
    ...NewsActionCreators,
    ...NewsFormActionCreators,
    ...GuideFormActionCrators,
    ...CurrentGuideActionCreators
}

export default ActionCreators