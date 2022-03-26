import { Dispatch } from "react"
import { ControlAction, ControlData, ControlActionTypes } from "../types/controlTypes"

export const fetchControlData = () => {
    return async (dispatch: Dispatch<ControlAction>) => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        const responseData = await fetch("http://localhost:8080/api/v1/user/employee/page")
        const data = await responseData.json()
        if (data.content.length !== 0) {
            let newControlArray: ControlData[] = []
            data.content.forEach((item: any) => {
                newControlArray.push({
                    id: item.id,
                    name: `${item.middleName} ${item.firstName} ${item.lastName}`,
                    department: item.department.name,
                    phone: item.phone ? item.phone : "Телефон отсутствует",
                    email: item.email,
                    password: item.password ? "Получен" : "Отправлен"
                })
            })
            dispatch({type: ControlActionTypes.SET_CONTROL_DATA, payload: newControlArray})
        } else dispatch({type: ControlActionTypes.SET_CONTROL_DATA, payload: null})
        

        await fetch("http://localhost:8080/api/logout")
    }
}