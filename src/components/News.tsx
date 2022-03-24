import React from "react"

import AddNews from "./AddNews"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"

function News() {

    const newsData               = useTypedSelector(state => state.news)
    const { fetchNewsData }      = useActions()

    const [addForm, setAddForm] = React.useState<boolean>(false)

    React.useEffect(() => {
        fetchNewsData()
    }, [])

    const showAddForm = () => {
        setAddForm(addForm => !addForm)
    }

    return (
        <div className="news">
            <div className="container">
                <div className="news__content">
                    <div className="news__head">
                        <div className="news__title">
                            Редактирование новостей
                        </div>
                        <div className="news__create" onClick={showAddForm}> 
                            Создать новость
                        </div>
                    </div>
                    {addForm && <AddNews />}
                    <div className="news__list">
                        {
                            newsData.map(item => {
                                return (
                                    <div className="news__item" key={item.id}>
                                        <div className="news__image" style={{backgroundImage: `url('${item.fileId}')`}}>

                                        </div>
                                        <div className="news__info">
                                            <div className="news__date">
                                                {item.createdAt}
                                            </div>
                                            <div className="news__text">
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="news__all">Показать все новости</div>
                </div>
            </div>
        </div>
    )
}

export default News