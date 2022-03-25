interface item {
    name: string,
    expandable: boolean
}

let listArray: item[] = []

for (let i: number = 1; i < 5; i++) {
    listArray.push({
        name: `Справочник ${i}`,
        expandable: false
    })
}

listArray[3].expandable = true

function Guide() {

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
                        {listArray.map(item => {
                            return (
                                <div className="guide__item" key={Math.random()}>
                                    <div className="guide__item-top">
                                        <div className="guide__subtitle">{item.name}</div>
                                        <div className="guide__button">{item.expandable ? "Добавить" : "Посмотреть"}</div>
                                    </div>
                                    <div className="guide__expandable">{item.expandable ? "Расширяемый" : "Нерасширяемый"}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="guide__all">Показать все справочники</div>
                </div>
            </div>
        </div>
    )
}

export default Guide