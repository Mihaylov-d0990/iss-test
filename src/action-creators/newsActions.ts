import { NewsActionTypes, AddNewsData } from "../types/newsTypes"

import { Dispatch } from "redux"
import { NewsAction } from "../types/newsTypes"

export const fetchNewsData = () => {
    return async (dispatch: Dispatch<NewsAction>) => { 

        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })
        
        const newsResponse = await fetch('http://localhost:8080/api/v1/news/page?size=3')
        let data = (await newsResponse.json()).content

        if (data[0]?.fileId) {
            const responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[0].fileId}`)
            const image = await responseImage.blob()
            data[0].fileId = URL.createObjectURL(image)
        }

        if (data[1]?.fileId) {
            const responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[1].fileId}`)
            const image = await responseImage.blob()
            data[1].fileId = URL.createObjectURL(image)
        }

        if (data[2]?.fileId) {
            const responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[2].fileId}`)
            const image = await responseImage.blob()
            data[2].fileId = URL.createObjectURL(image)
        }

        dispatch({type: NewsActionTypes.FETCH_NEWS_DATA, payload: data})
        await fetch("http://localhost:8080/api/logout")
    }
}

export const addNewsDB = (addNewsData: AddNewsData) => {
    return async () => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        if (addNewsData.file) {       
            const formData = new FormData()
            formData.append("file", addNewsData.file)

            const responseImage = await fetch("http://localhost:8080/api/v1/file", { method: "POST", body: formData})
            const imageId = await responseImage.json()


            await fetch(`http://localhost:8080/api/v1/news`, { 
                method: "POST",
                body: JSON.stringify({
                    title: addNewsData.title,
                    content: addNewsData.content,
                    fileId: imageId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
        }

        await fetch("http://localhost:8080/api/logout")
    }
}

export const deleteNewsDB = (id: string) => {
    return async () => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })

        const response = await fetch(`http://localhost:8080/api/v1/news?id=${id}`, { method: "Delete" })
        console.log(response);
        
        

        await fetch("http://localhost:8080/api/logout")
    }
}