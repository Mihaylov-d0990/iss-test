import { NewsActionTypes} from "../types/newsTypes"
import { NewsFormData } from "../types/newsFormTypes"

import { Dispatch } from "redux"
import { NewsAction } from "../types/newsTypes"

const formatDate = (date: Date): string => {
    const day: string = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString()
    const month: string = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString()
    return `${day}.${month}.${date.getFullYear()}`
}

export const fetchNewsData = (resolve: Function | null) => {
    return async (dispatch: Dispatch<NewsAction>) => { 

        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })
        
        const newsResponse = await fetch('http://localhost:8080/api/v1/news/page?size=3')
        let data = (await newsResponse.json()).content

        if (data[0]?.fileId) {
            const responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[0].fileId}`)
            const image = await responseImage.blob()
            data[0].createdAt =  formatDate(new Date(data[0].createdAt))
            data[0].fileId = URL.createObjectURL(image)
        }

        if (data[1]?.fileId) {
            const responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[1].fileId}`)
            const image = await responseImage.blob()
            data[1].createdAt = formatDate(new Date(data[1].createdAt))
            data[1].fileId = URL.createObjectURL(image)
        }

        if (data[2]?.fileId) {
            const responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[2].fileId}`)
            const image = await responseImage.blob()
            data[2].createdAt = formatDate(new Date(data[2].createdAt))
            data[2].fileId = URL.createObjectURL(image)
        }       

        dispatch(({type: NewsActionTypes.FETCH_NEWS_DATA, payload: data}))
        await fetch("http://localhost:8080/api/logout")
        if (resolve) resolve()
    }
}

export const addNewsDB = (addFormData: NewsFormData, file: File | null, resolve: Function | null) => {
    return async () => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        try {
            if (file) {       
                const formData = new FormData()
                formData.append("file", file)
    
                const responseImage = await fetch("http://localhost:8080/api/v1/file", { method: "POST", body: formData})
                const imageId = await responseImage.json()
                
                await fetch(`http://localhost:8080/api/v1/news`, { 
                    method: "POST",
                    body: JSON.stringify({
                        title: addFormData.title,
                        content: addFormData.content,
                        fileId: imageId
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                
            } else if(addFormData.link.length > 0) {
                try {
                    const res = await fetch(addFormData.link)
                    const image = await res.blob()
                    return image
        
                } catch(error: any) {
                    throw new Error(`Ошибка: ${error.message}.${(error.message === "Failed to fetch" ? " Попробуйте загрузить файл с комьютера." : "")}`)     
                } 
            } else {
                throw new Error("Ошибка: Изображение не выбрано. Попробуйте загрузить файл с комьютера.")
            }
        } catch (e: any) {
            console.error(e.message)
        }

        await fetch("http://localhost:8080/api/logout")
        if (resolve) resolve()
    }
}

export const patchNewsDB = (addFormData: NewsFormData, file: File | null, resolve: Function | null) => {
    return async () => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        let fileId = addFormData.fileId

        if (file) {       
            const formData = new FormData()
            formData.append("file", file)

            const responseImage = await fetch("http://localhost:8080/api/v1/file", { method: "POST", body: formData})
            fileId = await responseImage.json()
            
        } else if(addFormData.link.length > 0) {
            try {
                const res = await fetch(addFormData.link)
                const image = await res.blob()
                return image
    
            } catch(error: any) {
                throw new Error(`Ошибка: ${error.message}.${(error.message === "Failed to fetch" ? " Попробуйте загрузить файл с комьютера." : "")}`)     
            } 
        } 

        // This API request doesn't work. It doesn't work in the swagger ui and on the client.

        await fetch(`http://localhost:8080/api/v1/news?id=${addFormData.id}`, { 
            method: "PATCH",
            body: JSON.stringify({
                title: addFormData.title,
                content: addFormData.content,
                fileId: fileId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        await fetch("http://localhost:8080/api/logout")

        if (resolve) resolve()
    }
}

export const deleteNewsDB = (id: string, resolve: Function) => {
    return async () => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        await fetch(`http://localhost:8080/api/v1/news?id=${id}`, { method: "Delete" })

        await fetch("http://localhost:8080/api/logout")

        resolve()
    }
}