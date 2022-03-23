import { PersonalAction, PersonalActionTypes, PersonalData } from "../types/personalTypes"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { Dispatch } from "redux"

export const fetchPersonalData = () => {
    return async (dispatch: Dispatch<PersonalAction>) => {

        let parsedData: PersonalData

        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            return fetch(`http://localhost:8080/api/v1/user?id=${data.id}`)
        })
        .then(response => response.json())
        .then(data => {     
            parsedData = {
                name: `${data.firstName} ${data.middleName} ${data.lastName }`,
                email: data.email,
                photo: data.photoId
            }
            
           return fetch(`http://localhost:8080/api/v1/file/${parsedData.photo}`)
        })
        .then(response => response.blob())
        .then(data => parsedData.photo = URL.createObjectURL(data))
        .then(() => {
            dispatch({type: PersonalActionTypes.FETCH_PERSONAL_DATA, payload: parsedData})
            fetch("http://localhost:8080/api/logout")
        })

    }
}

export const updatePersonalData = (newPersonalData: PersonalData) => {
    return (dispatch: Dispatch<PersonalAction>) => {
        dispatch({type: PersonalActionTypes.FETCH_PERSONAL_DATA, payload: newPersonalData})
        
    }
}

export const patchPersonalData = (patchData: PersonalData) => {
    return async (dispatch: Dispatch<PersonalAction>) => {
        
        const nameArray = patchData.name.split(' ')
        
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            return fetch(`http://localhost:8080/api/v1/user/fio`, {
                method: "PATCH",
                body: JSON.stringify({
                    id: data.id,
                    firstName: nameArray[0],
                    lastName: nameArray[2],
                    middleName: nameArray[1]
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
        .then(() => {
            fetch("http://localhost:8080/api/logout")
        })

    }
}