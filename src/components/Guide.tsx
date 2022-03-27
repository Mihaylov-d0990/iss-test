import { MouseEventHandler } from "react"
import { CurrentGuideData } from "../types/currentGuideTypes"

interface GuideProps {
    item: CurrentGuideData,
    fetchData: MouseEventHandler<HTMLDivElement>,
}

//  Guide component. This component of the guide list

function Guide(item: GuideProps) {
    return (
        <div className="guide__item">
            <div className="guide__item-top">
                <div className="guide__subtitle">{item.item.name}</div>
                <div className="guide__button" onClick={item.fetchData}>{item.item.expandable ? "+ Добавить" : "Посмотреть"}</div>
            </div>
            <div className="guide__expandable">{item.item.expandable ? "Расширяемый" : "Нерасширяемый"}</div>
        </div>
    )
}

export default Guide