import React from "react"
import { ControlFormDepartmentData, ControlFormPositionData } from "../types/controlFormTypes"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"

function ControlForm() {

    const formData = useTypedSelector(state => state.controlForm)
    const { fetchFormData,
            updateFormData,
            uploadFormData } = useActions()

    React.useEffect(() => {
        fetchFormData()
    }, [])
    
    return (
        <div className="control-form">
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
                <div className="control-form__create" onClick={() => uploadFormData(formData)}>Сохранить</div>
            </div>
        </div>
    )
}

export default ControlForm