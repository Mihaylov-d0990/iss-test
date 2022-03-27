import React from "react"
import { useActions } from "../hooks/useAction"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ControlData } from "../types/controlTypes"
import ControlForm from "./ControlForm"

//  Control component. User data is displayed here

function Control() {
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false)
    const { fetchControlData, setWindow }     = useActions()
    const [open, setOpen]                     = React.useState<boolean>(true)
    const controlData                         = useTypedSelector(state => state.control)
    
    React.useEffect(() => {
        fetchControlData(null)
    }, [])

    React.useEffect(() => {
        if (formVisibility) setWindow(true)
        else if (!formVisibility) setWindow(false)
    }, [formVisibility])

    const showForm = () => setFormVisibility(formVisibility => !formVisibility)

    const refresh = require("../images/refresh.svg").default
    const edit = require("../images/edit.svg").default
    const trash = require("../images/trash.svg").default

    return(
        <>
            {formVisibility ? <ControlForm closeForm={showForm} /> : <></>}
            <div className="control">
                <div className="container">
                    <div className="control__content">
                        {
                            open ? 
                            <>
                                <div className="control__title title" onClick={() => setOpen(open => !open)}>Управление пользователями</div>
                            </> : 
                            <>
                                <div className="control__title control__title_closed title" onClick={() => setOpen(open => !open)}>Управление пользователями</div>
                            </>
                        }
                        {
                            open ?
                            <>
                                <div className="control__add">
                                    <div className="control__subtitle">Сотрудник</div>
                                    <div className="control__add-button" onClick={showForm}>+ Добавить пользователя</div>
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
                                            {controlData?.map((item: ControlData, index) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{index}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.department}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.password}</td>
                                                        <td>
                                                            <img src={refresh} alt="" />
                                                            <img src={edit} alt="" />
                                                            <img src={trash} alt="" />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    {!controlData ? <div className="control__empty">Пока сотрудников нет</div> : <></>}
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
                                        <select defaultValue={2} aria-readonly>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                        </select>
                                </div>
                            </> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Control