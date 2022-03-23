interface item {
    date: string,
    title: string
}

let listArray: item[] = []

for (let i: number = 0; i < 3; i++) {
    listArray.push({
        date: "22.03.2022",
        title: "Проект проект"
    })
}

function News() {

    return (
        <div className="news">
            <div className="container">
                <div className="news__content">
                    <div className="news__head">
                        <div className="news__title">
                            Редактирование новостей
                        </div>
                        <div className="news__create">
                            Создать новость
                        </div>
                    </div>
                    <div className="news__list">
                        {
                            listArray.map(item => {
                                return (
                                    <div className="news__item" key={Math.random()}>
                                        <div className="news__image">

                                        </div>
                                        <div className="news__info">
                                            <div className="news__date">
                                                {item.date}
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