import React from "react"

import NewsForm from "./NewsForm"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"

function News() {

    const newsData                = useTypedSelector(state => state.news)
    const { fetchNewsData,
            addNewsDB,
            deleteNewsDB,
            getNewsData,
            patchNewsDB }         = useActions()

    const [addForm, setAddForm]   = React.useState<boolean>(false)
    const [editForm, setEditForm] = React.useState<boolean>(false)

    React.useEffect(() => {
        fetchNewsData(null)
    }, [])

    const showAddForm = () => setAddForm(addForm => !addForm)

    const showEditForm = (id: string) => {
        getNewsData(id)
        setEditForm(editForm => !editForm)
    }

    const FormCreator = () => {
        if (addForm) return <NewsForm name="Создать новость" showForm={showAddForm} addNewsDB={addNewsDB} />
        if (editForm) return <NewsForm name="Редактировать новость" showForm={showEditForm} addNewsDB={patchNewsDB} />
        
        return null
    }

    const editImage: string = require("../images/edit.svg").default  
    const trashImage: string = require("../images/trash.svg").default  

    return (
        <div className="news">
            <div className="container">
                <div className="news__content">
                    <div className="news__head">
                        <div className="news__title title">
                            Редактирование новостей
                        </div>
                        {!addForm ?
                        <div className="news__create" onClick={showAddForm}>+ Создать новость</div> : 
                        <div className="news__create"></div>}
                    </div>
                    <FormCreator />
                    <div className="news__list">
                        {
                            newsData.map(item => {
                                return (
                                    <div className="news__item" key={item.id}>
                                        <div className="news__image" style={{backgroundImage: `url('${item.fileId}')`}}>

                                        </div>
                                        <div className="news__bottom">
                                            <div className="news__info">
                                                <div className="news__date">
                                                    {item.createdAt}
                                                </div>
                                                <div className="news__text">
                                                    {item.title}
                                                </div>
                                            </div>
                                            <div className="news__control">
                                                <div className="news__edit" onClick={() => showEditForm(item.id)}><img src={editImage} alt="" /></div>
                                                <div className="news__delete" onClick={async () => {
                                                    await new Promise((resolve) => {
                                                        deleteNewsDB(item.id, resolve)
                                                    })

                                                    await new Promise((resolve) => {
                                                        fetchNewsData(resolve)
                                                    })
                                                }}>
                                                    <img src={trashImage} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })   
                        }
                        { newsData.length === 0 ? <div className="news__empty">Пока новостей нет</div> : ""}
                    </div>
                    <div className="news__all">Показать все новости</div>
                </div>
            </div>
        </div>
    )
}

export default News