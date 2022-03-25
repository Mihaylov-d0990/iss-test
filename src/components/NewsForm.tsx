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
    const [errorMessage, setErrorMessage] = React.useState<string>("")

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        let fileName: string = newsData.file
        if(e.target.files) fileName = e.target.files[0].name
        else fileName = ""
        console.log(fileRef.current?.files);
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
    
    return (
        <div className="add-news">
            <div className="add-news__name">{newsProps.name}</div>
            <label className="add-news__title">
                Тема
                <input 
                    value={newsData.title} onChange={e => (updateNewsFormData({...newsData, title: e.target.value}))}
                    type="text" className="add-news__title-text" />
            </label>
            <label className="add-news__content">
                Текст
                <textarea
                    value={newsData.content} onChange={e => (updateNewsFormData({...newsData, content: e.target.value}))}
                    rows={15} className="add-news__content-text">
                </textarea>
            </label>
            <div className="add-news__bottom">
                <div className="add-news__link">
                    <label>
                        Ссылка
                        <input
                            value={newsData.link} onChange={e => (updateNewsFormData({...newsData, link: e.target.value}))} 
                            type="text" className="add-news__link-text" />
                    </label>
                    <div className="add-news__error">{errorMessage}</div>
                </div>
                <div className="add-news__control">
                    <div className="add-news__file">
                        Загрузить изображение
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
                                        setErrorMessage,
                                        resolve
                                    )
                                });
                                
                                await new Promise((resolve) => {
                                    fetchNewsData(resolve)
                                }); 
                                
                            }}
                        >Сохранить</div>
                        <div className="add-news__cancel" onClick={closeForm}>Отмена</div>
                    </div>
                </div>
            
            </div>

        </div>
    )
}

export default NewsForm