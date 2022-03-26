import { Dispatch } from "react"
import { GuideFormAction, GuideFormActionTypes } from "../types/guideFormTypes"

export const fetchGuideFormData = (type: string | undefined, resolve: Function | null) => {
    return async (dispatch: Dispatch<GuideFormAction>) => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        if (type?.length !== 0) {
            const responseGuide = await fetch(`http://localhost:8080/api/v1/nsi/${type}/page`)
            const guideData = await responseGuide.json()
            dispatch({type: GuideFormActionTypes.SET_GUIDE_FORM_DATA, payload: guideData.content})
        }

        await fetch("http://localhost:8080/api/logout")

        if (resolve) resolve()
    }
}

export const addGuide = (name: string, guideClass: string | undefined, resolve: Function | null) => {
    return async () => {
        
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        try {
            if (name.length !== 0) {
                const response = await fetch(`http://localhost:8080/api/v1/nsi/${guideClass}`, {
                    body: `["${name}"]`,
                    headers: {
                      Accept: "*/*",
                      "Content-Type": "application/json"
                    },
                    method: "POST"
                })
                console.log(await response.json());
                
            } else {
                throw new Error("Input can't be empty")
            }

        } catch(e) {
            console.error(e)
        }
        
        await fetch("http://localhost:8080/api/logout")

        if (resolve) resolve()
    }
}