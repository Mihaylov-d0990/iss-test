import { NewsActionTypes, NewsData } from "../types/newsTypes"

import { Dispatch } from "redux"
import { NewsAction } from "../types/newsTypes"

export const fetchNewsData = () => {
    return async (dispatch: Dispatch<NewsAction>) => {
        await fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', { method: "POST" })
        
        const newsResponse = await fetch('http://localhost:8080/api/v1/news/page?size=3')
        let data = (await newsResponse.json()).content

        let responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[0].fileId}`)
        let image = await responseImage.blob()
        data[0].fileId = URL.createObjectURL(image)

        responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[1].fileId}`)
        image = await responseImage.blob()
        data[1].fileId = URL.createObjectURL(image)

        responseImage = await fetch(`http://localhost:8080/api/v1/file/${data[2].fileId}`)
        image = await responseImage.blob()
        data[2].fileId = URL.createObjectURL(image)
        
        
        dispatch({type: NewsActionTypes.FETCH_NEWS_DATA, payload: data})
        await fetch("http://localhost:8080/api/logout")
    }
}