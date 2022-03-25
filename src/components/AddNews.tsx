import React, { MouseEventHandler } from "react"
import { AddNewsData } from "../types/newsTypes"

interface NewsProps {
    name: string,
    showForm: MouseEventHandler,
    addNewsDB: Function
}

interface NewsDataAdding {
    title: string,
    content: string,
    link: string
}

const AddNews = (newsProps: NewsProps) => {

    const [newsData, setNewsData] = React.useState<NewsDataAdding>({
        title: "",
        content: "",
        link: ""
    })

    const fileRef                 = React.useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = React.useState<string>("")

    const urlToFile = async (url: string) => {
        try {
            const res = await fetch(url)
            const image = await res.blob()
            return image

        } catch(error: any) {
            setErrorMessage(`Ошибка: ${error.message}.${(error.message === "Failed to fetch" ? " Попробуйте загрузить файл с комьютера." : "")}`)     
        } 
    }
    
    const saveData = () => {
        const fileList: FileList | null | undefined = fileRef.current?.files
        let file: File | null = fileList ? fileList[0] : null 

        let addNewsData: AddNewsData  = {
            title: newsData.title,
            content: newsData.content,
            file: null
        }
        
        if (file) {
            addNewsData.file = file
            newsProps.addNewsDB(addNewsData)
        } else if(newsData.link.length > 0) {
            urlToFile(newsData.link)
            .then(data => {
                if (data) {
                    addNewsData.file = data
                    newsProps.addNewsDB(addNewsData)
                }
            })
        } 
    }

    return (
        <div className="add-news">
            <div className="add-news__name">{newsProps.name}</div>
            <label className="add-news__title">
                Тема
                <input 
                    value={newsData.title} onChange={e => setNewsData({...newsData, title: e.currentTarget.value})}
                    type="text" className="add-news__title-text" />
            </label>
            <label className="add-news__content">
                Текст
                <textarea
                    value={newsData.content} onChange={e => setNewsData({...newsData, content: e.currentTarget.value})}
                    rows={15} className="add-news__content-text">
                </textarea>
            </label>
            <div className="add-news__bottom">
                <div className="add-news__link">
                    <label>
                        Ссылка
                        <input
                            value={newsData.link} onChange={e => setNewsData({...newsData, link: e.currentTarget.value})} 
                            type="text" className="add-news__link-text" />
                    </label>
                    <div className="add-news__error">{errorMessage}</div>
                </div>
                <div className="add-news__control">
                    <div className="add-news__file">
                        Загрузить изображение
                        <input type="file" ref={fileRef} />
                    </div>
                    <div className="add-news__buttons">
                        <div className="add-news__save" onClick={saveData}>Сохранить</div>
                        <div className="add-news__cancel" onClick={newsProps.showForm}>Отмена</div>
                    </div>
                </div>
            
            </div>

        </div>
    )
}

export default AddNews