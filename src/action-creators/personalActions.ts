import { PersonalAction, PersonalActionTypes, PersonalData } from "../types/personalTypes"
import { Dispatch } from "redux"
import { ImageData } from "../types/personalTypes"

// Fetching personal data from the database

export const fetchPersonalData = () => {
    return async (dispatch: Dispatch<PersonalAction>) => {
        
        const responseLogin = await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })
        let data = await responseLogin.json()
        
        const responseUser = await fetch(`http://localhost:8080/api/v1/user?id=${data.id}`)
        data = await responseUser.json()

        const parsedData: PersonalData = {
            name: `${data.firstName} ${data.middleName} ${data.lastName }`,
            email: data.email,
            photoId: data.photoId
        }
        
        const responseImage =  await fetch(`http://localhost:8080/api/v1/file/${data.photoId}`)
        const image = await responseImage.blob()

        parsedData.photoUrl = URL.createObjectURL(image)

        dispatch({type: PersonalActionTypes.FETCH_PERSONAL_DATA, payload: parsedData})           
        await fetch("http://localhost:8080/api/logout")
    }
}

// Updating personal data state

export const updatePersonalData = (newPersonalData: PersonalData) => {
    return (dispatch: Dispatch<PersonalAction>) => {
        dispatch({type: PersonalActionTypes.FETCH_PERSONAL_DATA, payload: newPersonalData})
    }
}

// Updating image link in the personal data state 

export const updatePersonalImage = (resolve: Function) => {
    return async (dispatch: Dispatch<PersonalAction>) => {
        
        const responseLogin = await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })
        let data = await responseLogin.json()

        const responseUser = fetch(`http://localhost:8080/api/v1/user?id=${data.id}`)
        data = await (await responseUser).json()

        const responseImage = fetch(`http://localhost:8080/api/v1/file/${data.photoId}`) 
        const image = await (await responseImage).blob()
        const photoUrl: string = URL.createObjectURL(image)
        const object: ImageData = {photoUrl: photoUrl}
        dispatch({type: PersonalActionTypes.FETCH_IMAGE, payload: object})

        await fetch("http://localhost:8080/api/logout")

        resolve()
    }
}

// Updating personal data in the database

export const patchPersonalData = (patchData: PersonalData, file: File | null, resolve: Function) => {
    return async () => {
        
        let userId: string = ""
        const nameArray = patchData.name.split(' ') 
        
        const responseLogin = await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })
        userId = (await responseLogin.json()).id
      
        if (file) {       
            const formData = new FormData()
            formData.append("file", file)

            const responseImage = await fetch("http://localhost:8080/api/v1/file", { method: "POST", body: formData})
            const imageId = await responseImage.json()

            await fetch(`http://localhost:8080/api/v1/user/photo?id=${userId}&fileId=${imageId}`, { method: "PATCH" })
        }

        await fetch(`http://localhost:8080/api/v1/user/fio`, {
            method: "PATCH",
            body: JSON.stringify({
                id: userId,
                firstName: nameArray[0],
                lastName: nameArray[2],
                middleName: nameArray[1]
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        await fetch("http://localhost:8080/api/logout")

        resolve()
    }
}