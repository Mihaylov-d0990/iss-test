import React from "react"

import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"
import { PersonalData } from "../types/personalTypes"
 
function PersonalInfo() {

    const personalData                              = useTypedSelector(state => state.personal)
    const { fetchPersonalData, 
            updatePersonalData, 
            patchPersonalData }                     = useActions()

    const [edit, setEdit]                           = React.useState<boolean>(true)
    const [localPersonalData, setLocalPersonalData] = React.useState<PersonalData>(() => personalData)

    React.useEffect(() => {
        fetchPersonalData()
    }, [])

    React.useEffect(() => {
        setLocalPersonalData({...personalData})
    }, [personalData])

    const editPersonal = () => {
        if (!edit) patchPersonalData(personalData)
        setEdit(edit => !edit)
    }

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
                        <div className="personal__edit" onClick={editPersonal}>
                            Редактировать
                        </div>
                    </div>
                    <div className="personal__data">
                        <img src={personalData.photo?.toString()} className="personal__image"></img>
                        <div className="personal__info">
                            <div className="personal__name">
                                <div className="personal__subtitle">ФИО</div>
                                <div className="personal__text">
                                    <input 
                                        type="text" value={localPersonalData.name} disabled={edit}
                                        onChange={e => updatePersonalData({...personalData, name: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="personal__email">
                                <div className="personal__subtitle">Email</div>
                                <div className="personal__text">
                                    <input 
                                        type="text" value={localPersonalData.email} disabled={edit}
                                        onChange={e => updatePersonalData({...personalData, email: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo