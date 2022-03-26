// News form types 

export interface NewsFormData {
    id: string,
    title: string,
    content: string,
    link: string,
    file: string,
    fileId: string    
}

export enum NewsFormActionTypes {
    SET_NEWS_FORM_DATA = "SET_NEWS_FORM_DATA"
}

export interface setNewsFormAction {
    type: NewsFormActionTypes.SET_NEWS_FORM_DATA,
    payload: NewsFormData
}

export type NewsFormAction = setNewsFormAction