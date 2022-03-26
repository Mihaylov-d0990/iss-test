function Structure() {

    const edit = require("../images/edit.svg").default

    return (
        <div className="structure">
            <div className="container">
                <div className="structure__content">
                    <div className="structure__add">
                        <div className="structure__title">Организационно-штатная структура ФОИВ</div>
                        <div className="structure__add-button">
                            <img src={edit} alt="" />
                            Редактировать
                        </div>
                    </div>
                </div>
                <div className="structure__list">
                    <ol>
                        <li>
                            <select>
                                <option value="test">test</option>
                                <option value="test">test</option>
                            </select>
                            <select>
                                <option value="test">test</option>
                            </select>
                            <select>
                                <option value="test">test</option>
                            </select>
                            <ol>
                                <li>
                                    <select>
                                        <option value="test">test</option>
                                    </select>
                                    <select>
                                        <option value="test">test</option>
                                    </select>
                                    <ol>
                                        <li>
                                            <select>
                                                <option value="test">test</option>
                                            </select>
                                            <select>
                                                <option value="test">test</option>
                                            </select>
                                        </li>
                                        <li>
                                            <select>
                                                <option value="test">test</option>
                                            </select>
                                            <select>
                                                <option value="test">test</option>
                                            </select>
                                        </li>
                                    </ol>
                                </li>      
                                <li>
                                    <select>
                                        <option value="test">test</option>
                                    </select>
                                    <select>
                                        <option value="test">test</option>  
                                    </select>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <select>
                                <option value="test">test</option>
                            </select>
                            <select>
                                <option value="test">test</option>
                            </select>
                            <select>
                                <option value="test">test</option>
                            </select>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Structure