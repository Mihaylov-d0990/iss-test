
function Control() {

    const refresh = require("../images/refresh.svg").default
    const edit = require("../images/edit.svg").default
    const trash = require("../images/trash.svg").default

    return(
        <div className="control">
            <div className="container">
                <div className="control__content">
                    <div className="control__title title">Управление пользователями</div>
                    <div className="control__add">
                        <div className="control__subtitle">Сотрудник</div>
                        <div className="control__add-button">+ Добавить пользователя</div>
                    </div>
                    <div className="control__search">
                        <input type="text" placeholder="ФИО + email"/>
                        <div className="control__search-button">Поиск</div>
                    </div>
                    <div className="control__table">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>ФИО</th>
                                    <th>Департамент</th>
                                    <th>Телефон</th>
                                    <th>Почта</th>
                                    <th>Пароль</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2</td>
                                    <td>Петров Пётр Петрович</td>
                                    <td>ИТ</td>
                                    <td>8 983 123 45 67</td>
                                    <td>nsu@mail.ry</td>
                                    <td>Получен</td>
                                    <td>
                                        <img src={refresh} alt="" />
                                        <img src={edit} alt="" />
                                        <img src={trash} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Иванов Иван Иванович</td>
                                    <td>Цифровизация</td>
                                    <td>8 983 123 45 67</td>
                                    <td>ntsu@mail.ru</td>
                                    <td>Отправлен</td>
                                    <td>
                                        <img src={refresh} alt="" />
                                        <img src={edit} alt="" />
                                        <img src={trash} alt="" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="control__routing">
                        <div className="control__route">←</div>
                        <div className="control__route control__route_active">1</div>
                        <div className="control__route">2</div>
                        <div className="control__route">3</div>
                        <div className="control__route">4</div>
                        <div className="control__route">5</div>
                        <div className="control__route">6</div>
                        <div className="control__route">...</div>
                        <div className="control__route">28</div>
                        <div className="control__route">→</div>
                    </div>
                    <div className="control__paging">
                            <div>НА СТРАНИЦЕ: </div>
                            <select value={2}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Control