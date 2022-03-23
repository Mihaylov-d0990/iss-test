import { PersonalAction, PersonalActionTypes, PersonalData } from "../types/personalTypes"
import { Dispatch } from "redux"

export const fetchPersonalData = () => {
    return async (dispatch: Dispatch<PersonalAction>) => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            return fetch(`http://localhost:8080/api/v1/user?id=${data.id}`)
        })
        .then(response => response.json())
        .then(data => {
            let parsedData: PersonalData = {
                name: {
                    name: data.firstName,
                    surname: data.middleName,
                    lastname: data.lastName
                },
                email: data.email
            }
            dispatch({type: PersonalActionTypes.FETCH_PERSONAL_DATA, payload: parsedData})
            
        })

    }
}