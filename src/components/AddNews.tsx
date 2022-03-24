
function AddNews() {

    return (
        <div className="add-news">
            <div className="add-news__name">Создать новость</div>
            <label className="add-news__title">
                Тема
                <input 
                    type="text" className="add-news__title-text" />
            </label>
            <label className="add-news__content">
                Текст
                <textarea 
                    rows={15} className="add-news__content-text">

                </textarea>
            </label>
            <div className="add-news__bottom">
                <div className="add-news__link">
                    <label>
                        Ссылка
                        <input 
                            type="text" className="add-news__link-text" />
                    </label>
                </div>
                <div className="add-news__control">
                    <input type="file" />
                    <div className="add-news__buttons">
                        <div className="add-news__save">Сохранить</div>
                        <div className="add-news__cancel">Отмена</div>
                    </div>
                </div>
            
            </div>

        </div>
    )
}

export default AddNews