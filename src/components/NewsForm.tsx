import React, { ChangeEvent } from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"
import { NewsFormData } from "../types/newsFormTypes"

interface NewsProps {
    name: string,
    showForm: Function,
    addNewsDB: Function 
}

const NewsForm = (newsProps: NewsProps) => {

    const newsData = useTypedSelector(state => state.newsForm)
    const { updateNewsFormData,
            fetchNewsData } = useActions()

    const fileRef                 = React.useRef<HTMLInputElement>(null)

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        let fileName: string = newsData.file
        if(e.target.files) fileName = e.target.files[0].name
        else fileName = ""
        updateNewsFormData({...newsData, file: fileName})       
    }

    const closeForm = () => {
        const data: NewsFormData = {
            id: "",
            title: "",
            content: "",
            link: "",
            file: "",
            fileId: ""
        }
        updateNewsFormData(data)
        newsProps.showForm()
    }

    const download = require("../images/download.svg").default
    
    return (
        <div className="blackout">
            <div className="add-news">
                <div className="container">
                    <div className="add-news__content">
                        <div className="add-news__name">{newsProps.name}</div>
                        <label className="add-news__title">
                            Тема
                            <input 
                                value={newsData.title} onChange={e => (updateNewsFormData({...newsData, title: e.target.value}))}
                                type="text" className="add-news__title-text" />
                        </label>
                        <label className="add-news__textarea">
                            Текст
                            <textarea
                                value={newsData.content} onChange={e => (updateNewsFormData({...newsData, content: e.target.value}))}
                                rows={15} className="add-news__textarea-text">
                            </textarea>
                        </label>
                        <div className="add-news__bottom">
                            <div className="add-news__link">
                                <label>Ссылка
                                    <input
                                        value={newsData.link} onChange={e => (updateNewsFormData({...newsData, link: e.target.value}))} 
                                        type="text" className="add-news__link-text" />
                                </label>
                            </div>
                            <div className="add-news__control">
                                <div className="add-news__file">
                                    <img src={download} alt="" />Загрузить изображение
                                    <input type="file" ref={fileRef} onChange={e => onFileChange(e)}/>
                                    <div className="add-news__file-name">{newsData.file}</div>
                                </div>    
                                <div className="add-news__buttons">
                                    <div 
                                        className="add-news__save" 
                                        onClick={async () => {
                                            await new Promise((resolve) => {
                                                newsProps.addNewsDB(
                                                    newsData, 
                                                    fileRef.current?.files ? fileRef.current.files[0] : null , 
                                                    resolve
                                                )
                                            });
                                            
                                            await new Promise((resolve) => fetchNewsData(resolve))

                                            closeForm()
                                        }}
                                    >Сохранить</div>
                                    <div className="add-news__cancel" onClick={closeForm}>Отмена</div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsForm