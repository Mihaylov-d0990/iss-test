import React, { MouseEventHandler } from "react"
import { ControlFormDepartmentData, ControlFormPositionData } from "../types/controlFormTypes"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"

interface props {
    closeForm: MouseEventHandler<HTMLDivElement>
}

function ControlForm(props: props) {

    const formData = useTypedSelector(state => state.controlForm)
    const { fetchFormData,
            updateFormData,
            uploadFormData,
            fetchControlData } = useActions()

    React.useEffect(() => {
        fetchFormData()
    }, [])

    const uploadData = async () => {
        await new Promise((resolve) => uploadFormData(formData, resolve))
        await new Promise((resolve) => fetchControlData(resolve))
    }
    
    return (
        <div className="blackout">
            <div className="control-form">
                <div className="container">
                    <div className="control-form__content">
                        <div className="control-form__title title">Добавить администратора РОУ</div>
                        <div className="control-form__form">
                            <div className="control-form__input control-form__input_necessarily">
                                <input type="text" placeholder="ФИО" value={formData.name} onChange={e => updateFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="control-form__input control-form__input_necessarily">
                                <select value={formData.positionId} onChange={e => updateFormData({...formData, positionId: e.currentTarget.value})} >
                                    <option value="dis" disabled>Должность</option>
                                    {formData.position.map((item: ControlFormPositionData) => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="control-form__input control-form__input_necessarily">
                                <input type="email" placeholder="Почта" value={formData.email} onChange={e => updateFormData({...formData, email: e.target.value})} />
                            </div>
                            <div className="control-form__input">
                                <input type="text" placeholder="Телефон" value={formData.phone} onChange={e => updateFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div className="control-form__input control-form__input_necessarily">
                                <select value={formData.departmentId} onChange={e => updateFormData({...formData, departmentId: e.currentTarget.value})}>
                                    <option value="dis" disabled>Департамент</option>
                                    {formData.department.map((item: ControlFormDepartmentData) => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="control-form__input">
                                <input type="text" placeholder="Пароль" disabled={true} />
                            </div>
                        </div>
                        <div className="control-form__buttons">
                            <div className="control-form__create" onClick={uploadData}>Сохранить</div>
                            <div className="control-form__cancel" onClick={props.closeForm}>Отмена</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlForm