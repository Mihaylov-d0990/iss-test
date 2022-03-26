import React, { MouseEventHandler } from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { GuideFormData } from "../types/guideFormTypes"
import { useActions } from "../hooks/useAction"

interface IGuideForm {
    hideForm: MouseEventHandler<HTMLDivElement>
}

function GuideForm(formProps: IGuideForm) {
    const guideFormData = useTypedSelector(state => state.guideForm)  
    const currentGuide = useTypedSelector(state => state.currentGuide)
    const [guideElementName, setElementGuideName] = React.useState<string>("")
    const { addGuide, fetchGuideFormData } = useActions()

    const addGuideElement = async () => {
        await new Promise((resolve) => addGuide(guideElementName, currentGuide?.guide, resolve))
        await new Promise((resolve) => fetchGuideFormData(currentGuide?.guide, resolve)  )   
    }
    
    return (
        <div className="guide-form">
            <div className="guide-form__title title">{currentGuide?.name}</div>
            <div className="guide-form__table">
                <table>
                    <thead>
                        <tr>
                            <th>Идентификатор</th>
                            <th>
                                <div className="guide-form__name">
                                    <div className="guide-form__subtitle">Название</div>
                                    {currentGuide?.expandable ? <div className="guide-form__add" onClick={addGuideElement}>+ Добавить</div> : <></>}
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
            </div>
            <div className="guide-form__save" onClick={formProps.hideForm}>Сохранить</div>
        </div>
    )
}

export default GuideForm