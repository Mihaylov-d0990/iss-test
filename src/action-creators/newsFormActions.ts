import { Dispatch } from "react"
import { NewsFormAction } from "../types/newsFormTypes"
import { NewsFormData, NewsFormActionTypes } from "../types/newsFormTypes"

//  Updating data of the certain news

export const updateNewsFormData = (data: NewsFormData) => {
    return (dispatch: Dispatch<NewsFormAction>) => {
        dispatch({type: NewsFormActionTypes.SET_NEWS_FORM_DATA, payload: data})
    }
}

//  Fetching data of the certain news

export const getNewsData = (id: string) => {
    return async (dispatch: Dispatch<NewsFormAction>) => {
        if (!id) return
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        const newsResponse = await fetch(`http://localhost:8080/api/v1/news/page`)
        const newsData = await newsResponse.json()

        let requiredData: any
    
        newsData.content.forEach((item: any) => {
            if (item.id === id) {
                requiredData = item
                return
            }
        })

        const imageListResponse = await fetch('http://localhost:8080/api/v1/file/list')
        let imageList = (await imageListResponse.json()).content

        let fileName: string = ""
        imageList.forEach((item: any) => {
            if (item.id === requiredData.fileId) {
                fileName = item.name
                return
            }
        })     

        const data: NewsFormData = {
            id: requiredData.id,
            title: requiredData.title,
            content: requiredData.content,
            link: "",
            file: fileName,
            fileId: requiredData.fileId
        }

        dispatch({type: NewsFormActionTypes.SET_NEWS_FORM_DATA, payload: data})
        await fetch("http://localhost:8080/api/logout")
    }
}