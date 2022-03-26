import Guide from "./Guide"
import GuideForm from "./GuideForm"
import { useActions } from "../hooks/useAction"
import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { CurrentGuideData } from "../types/currentGuideTypes"

let listArray: CurrentGuideData[] = []

for (let i: number = 1; i < 5; i++) {
    listArray.push({
        guide: "",
        name: `Справочник ${i}`,
        expandable: false
    })
}

listArray[3].expandable = true

function Guides() {
    const currentGuide = useTypedSelector(state => state.currentGuide)
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false)
    const { fetchGuideFormData,
            updateCurrentGuide } = useActions()
 
    const showForm = (resolve: Function) => {
        setFormVisibility(formVisibility => !formVisibility)
        resolve()
    }

    const hideForm = () => {
        updateCurrentGuide(null, null)
        setFormVisibility(false)
    }

    const toggleGuide = async (guideInfo: CurrentGuideData) => {
        if (!currentGuide) {
            await new Promise((resolve) => fetchGuideFormData(guideInfo.guide, resolve))
            await new Promise((resolve) => updateCurrentGuide(guideInfo, resolve))
            await new Promise((resolve) => showForm(resolve))
        }
    }

    return (
        <div className="guide">
            <div className="container">
                <div className="guide__content">
                    <div className="guide__head">
                        <div className="guide__title title">
                            Управление справочниками
                        </div>
                    </div>
                    <div className="guide__list">
                    <Guide item={listArray[0]} fetchData={() => { toggleGuide({guide: "DEPARTMENT", name: "Департамент", expandable: false}) }}/>
                    <Guide item={listArray[1]} fetchData={() => { toggleGuide({guide: "POSITION", name: "Позиция", expandable: false}) }}/>
                    <Guide item={listArray[2]} fetchData={() => { toggleGuide({guide: "TEST", name: "Тест", expandable: false}) }}/>
                    <Guide item={listArray[3]} fetchData={() => { toggleGuide({guide: "REGION", name: "Города", expandable: true}) }}/>
                    </div>
                    <div className="guide__all">Показать все справочники</div>
                    {formVisibility && <GuideForm hideForm={hideForm} />}
                </div>
            </div>
        </div>
    )
}

export default Guides