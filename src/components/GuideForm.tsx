import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { GuideFormData } from "../types/guideFormTypes"
import { useActions } from "../hooks/useAction"

//  Guide form component. There is adding data of new guide elements

interface IGuideForm {
    hideForm: Function
}

function GuideForm(formProps: IGuideForm) {
    const [guideElementName, setElementGuideName] = React.useState<string>("")
    const { addGuide, fetchGuideFormData }        = useActions()
    const guideFormData                           = useTypedSelector(state => state.guideForm)  
    const currentGuide                            = useTypedSelector(state => state.currentGuide)

    const addGuideElement = async () => {
        await new Promise((resolve) => addGuide(guideElementName, currentGuide?.guide, resolve))
        await new Promise((resolve) => fetchGuideFormData(currentGuide?.guide, resolve)  )   
    }
    
    return (
        <div className="blackout">
            <div className="guide-form">
                <div className="container">
                    <div className="guide-form__content">
                        <div className="guide-form__title title">{currentGuide?.name}</div>
                        <div className="guide-form__search"><input type="text" placeholder="Поиск по названию"/></div>
                        <div className="guide-form__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Идентификатор</th>
                                        <th>
                                            <div className="guide-form__name">
                                                <div className="guide-form__subtitle">Название</div>
                                                {currentGuide?.expandable ? <div className="guide-form__add">+ Добавить</div> : <></>}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentGuide?.expandable ? 
                                    <tr>
                                        <td></td>
                                        <td className="guide-form__input"><input type="text" onChange={e => setElementGuideName(e.target.value)} value={guideElementName} /></td>
                                    </tr> :
                                    <></>}
                                    {guideFormData.map((item: GuideFormData) => {
                                        return <tr key={item.id}>
                                            <td>{item.id.slice(-4)}</td>
                                            <td>{item.name}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            { guideFormData.length === 0 ? <div className="guide-form__empty">В справочнике не записей</div> : <></>}
                        </div>
                        <div className="guide-form__save" onClick={() => {addGuideElement(); formProps.hideForm()}}>Сохранить</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuideForm