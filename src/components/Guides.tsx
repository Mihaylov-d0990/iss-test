import Guide from "./Guide"
import GuideForm from "./GuideForm"
import { useActions } from "../hooks/useAction"
import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { CurrentGuideData } from "../types/currentGuideTypes"

// Guide component. Displaying guides

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
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false)
    const [open, setOpen]                     = React.useState<boolean>(true)
    const currentGuide                        = useTypedSelector(state => state.currentGuide)
    const { fetchGuideFormData,
        updateCurrentGuide,
        setWindow }                           = useActions()
    
    
 
    const showForm = (resolve: Function) => {
        setFormVisibility(formVisibility => !formVisibility)
        resolve()
    }

    const hideForm = () => {
        updateCurrentGuide(null, null)
        setFormVisibility(false)
    }

    React.useEffect(() => {
        if (formVisibility) setWindow(true)
        else if (!formVisibility) setWindow(false)
    }, [formVisibility])

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
                        <div className="guide__title title" onClick={() => setOpen(open => !open)}>
                            Управление справочниками
                        </div>
                    </div>
                    {
                        open ?
                        <>
                            <div className="guide__list">
                                <Guide item={listArray[0]} fetchData={() => { toggleGuide({guide: "DEPARTMENT", name: "Департамент", expandable: false}) }}/>
                                <Guide item={listArray[1]} fetchData={() => { toggleGuide({guide: "POSITION", name: "Должность", expandable: false}) }}/>
                                <Guide item={listArray[2]} fetchData={() => { toggleGuide({guide: "TEST", name: "Тест", expandable: false}) }}/>
                                <Guide item={listArray[3]} fetchData={() => { toggleGuide({guide: "REGION", name: "Регион", expandable: true}) }}/>
                            </div>
                            <div className="guide__all">Показать все справочники</div>
                            {formVisibility && <GuideForm hideForm={hideForm} />}
                        </> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Guides