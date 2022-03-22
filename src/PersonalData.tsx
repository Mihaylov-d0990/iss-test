import React from "react"

function PersonalData() {

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
                                <div className="personal__text">Васильев Иван Романович</div>
                            </div>
                            <div className="personal__email">
                                <div className="personal__subtitle">Email</div>
                                <div className="personal__text">vasiliev@gmail.ru</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalData