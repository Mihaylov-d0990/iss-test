import React from "react"
import NewsForm from "./NewsForm"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"

//  News component. Displaing news

function News() {
    const [currentDeleteID, setCurrentDeleteID] = React.useState<string>("")
    const [deleteForm, setDeleteForm]           = React.useState<boolean>(false)
    const [editForm, setEditForm]               = React.useState<boolean>(false)
    const [addForm, setAddForm]                 = React.useState<boolean>(false)
    const [open, setOpen]                       = React.useState<boolean>(true)
    const newsData                              = useTypedSelector(state => state.news)
    const { fetchNewsData,
            addNewsDB,
            deleteNewsDB,
            getNewsData,
            patchNewsDB,
            setWindow }                         = useActions()

    React.useEffect(() => {
        fetchNewsData(null)
    }, [])

    React.useEffect(() => {
        if (addForm || editForm || deleteForm) setWindow(true)
        else if (!addForm || !editForm || !deleteForm) setWindow(false)
    }, [addForm, editForm, deleteForm])

    const showAddForm       = () => setAddForm(addForm => !addForm)
    const showDeleteForm    = () => setDeleteForm(deleteForm => !deleteForm)

    const showEditForm = (id: string) => {
        getNewsData(id)
        setEditForm(editForm => !editForm)
    }

    const FormCreator = () => {
        if (addForm) return <NewsForm name="Создать новость" showForm={showAddForm} addNewsDB={addNewsDB} />
        if (editForm) return <NewsForm name="Редактировать новость" showForm={showEditForm} addNewsDB={patchNewsDB} />
        return null
    }

    interface deleteFormProps {
        id: string
    }

    //  Deleting form component. Сomponent appears before the news is deleting

    const DeleteForm = (props: deleteFormProps) => {
        const deleteNewsData = async () => {
            await new Promise((resolve) => {
                deleteNewsDB(props.id, resolve)
            })

            await new Promise((resolve) => {
                fetchNewsData(resolve)
            })
        }

        if (deleteForm) return (
            <div className="blackout">
                <div className="delete-form">
                    <div className="container">
                        <div className="delete-form__content">
                            <div className="delete-form__title">Вы действительно хотитет удалить новость?</div>
                            <div className="delete-form__buttons">
                                <div className="delete-form__delete" onClick={() => {
                                    deleteNewsData()
                                    showDeleteForm()
                                }}>Да</div>
                                <div className="delete-form__cancel" onClick={showDeleteForm}>Нет</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
        return null
    }

    const editImage: string = require("../images/edit.svg").default  
    const trashImage: string = require("../images/trash.svg").default  

    return (
        <>
            <DeleteForm id={currentDeleteID} />
            <FormCreator />
            <div className="news">
                <div className="container">
                    <div className="news__content">
                        <div className="news__head">
                            <div className="news__title title" onClick={() => setOpen(open => !open)}>
                                Редактирование новостей
                            </div>
                            {!addForm && open ?
                            <div className="news__create" onClick={showAddForm}>+ Создать новость</div> : 
                            <div className="news__create"></div>}
                        </div>
                        {
                            open ?
                            <>
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
                                                            <div className="news__delete" onClick={() => {
                                                                setCurrentDeleteID(item.id)
                                                                showDeleteForm()
                                                            }}>
                                                                <img src={trashImage} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })   
                                    }
                                    { newsData.length === 0 ? <div className="news__empty">Пока новостей нет</div> : <></>}
                                </div>
                                <div className="news__all">Показать все новости</div>
                            </> : <></>
                        }   
                    </div>
                </div>
            </div>
        </>
    )
}

export default News