// News types 

export interface NewsData {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    fileId?: string | null
}

export interface ImageData {
    imageUrl: string | null
}

export enum NewsActionTypes {
    FETCH_NEWS_DATA = "FETCH_NEWS_DATA",
    FETCH_IMAGE = "FETCH_IMAGE"
}

export interface fetchNewsDataAction {
    type: NewsActionTypes.FETCH_NEWS_DATA,
    payload: NewsData[]
}

export interface fetchImageAction {
    type: NewsActionTypes.FETCH_IMAGE,
    payload: ImageData
}

export type NewsAction = fetchNewsDataAction | fetchImageAction