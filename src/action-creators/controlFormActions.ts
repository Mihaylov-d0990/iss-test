import { Dispatch } from "react"
import { ControlFormAction, ControlFormActionTypes, ControlFormData } from "../types/controlFormTypes"

export const fetchFormData = () => {
    return async (dispatch: Dispatch<ControlFormAction>) => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        const departmentResponse = fetch("http://localhost:8080/api/v1/nsi/DEPARTMENT/page")
        const departmentData = await (await departmentResponse).json()

        const positionResponse = fetch("http://localhost:8080/api/v1/nsi/POSITION/page")
        const positionData = await (await positionResponse).json()

        const regionData = "00000000-0000-0000-0001-000000000001"

        const newFormData: ControlFormData = {
            name: "",
            position: positionData.content,
            positionId: "dis",
            email: "",
            phone: "",
            department: departmentData.content,
            departmentId: "dis",
            password: Math.random().toString(),
            region: regionData
        }

        dispatch({type: ControlFormActionTypes.SET_CONTROL_FORM_DATA, payload: newFormData})

        await fetch("http://localhost:8080/api/logout")
    }
}

export const updateFormData = (newData: ControlFormData) => {
    return async (dispatch: Dispatch<ControlFormAction>) => {
        dispatch({type: ControlFormActionTypes.SET_CONTROL_FORM_DATA, payload: newData})
    }
}

export const uploadFormData = (formData: ControlFormData, resolve: Function | null) => {
    return async () => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        const name = formData.name.split(" ")
        const response = await fetch("http://localhost:8080/api/v1/user/rou/emplyee", {
        body: `{
            "department":"${formData.departmentId}",
            "email":"${formData.email}",
            "firstName":"${name[1]}",
            "lastName":"${name[2]}",
            "middleName":"${name[0]}",
            "password":"${formData.password}",
            "position":"${formData.positionId}",
            "region":"${formData.region}"}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        method: "POST"
        })
        const userId = (await response.json()).id

        await fetch(`http://localhost:8080/api/v1/user/employee?id=${userId}&phone=${formData.phone}`, {
            headers: {
                Accept: "*/*"
            },
            method: "PATCH"
        })

        await fetch("http://localhost:8080/api/logout")

        if (resolve) resolve()
    }
}