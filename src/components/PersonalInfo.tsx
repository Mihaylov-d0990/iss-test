import React from "react"

import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPersonalData } from "../action-creators/personalActions"
import { useActions } from "../hooks/useAction"
 
function PersonalInfo() {

    const personalData = useTypedSelector(state => state.personal)
    const { fetchPersonalData } = useActions()

    React.useEffect(() => {
        fetchPersonalData()
    }, [])
    
    return (
        <div className="personal">
            <div className="container">
                <div className="personal__content">
                    <div className="personal__header">
                        Личный кабинет системного администратора
                    </div>
                    <div className="personal__head">
                        <div className="personal__title">
                            Персональные данные
                        </div>
                        <div className="personal__edit">
                            Редактировать
                        </div>
                    </div>
                    <div className="personal__data">
                        <div className="personal__image"></div>
                        <div className="personal__info">
                            <div className="personal__name">
                                <div className="personal__subtitle">ФИО</div>
                                <div className="personal__text">{`${personalData.name.name} ${personalData.name.surname} ${personalData.name.lastname}`}</div>
                            </div>
                            <div className="personal__email">
                                <div className="personal__subtitle">Email</div>
                                <div className="personal__text">{personalData.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo