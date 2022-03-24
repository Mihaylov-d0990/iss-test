import React from "react"

import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useAction"
import PersonalImage from "./PersonalImage"
 
function PersonalInfo() {

    const personalData                              = useTypedSelector(state => state.personal)
    const { fetchPersonalData, 
            updatePersonalImage,
            updatePersonalData, 
            patchPersonalData }                     = useActions()
    const [edit, setEdit]                           = React.useState<boolean>(true)

    const fileRef                                   = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        fetchPersonalData()
    }, [])    

    const editPersonal = async () => {
        const fileList: FileList | null | undefined = fileRef.current?.files
        const file: File | null = fileList ? fileList[0] : null  
        
        if (!edit) {
            await new Promise((resolve) => {
                patchPersonalData(personalData, file, resolve)
            });
            
            await new Promise((resolve) => {
                updatePersonalImage(resolve)
            });
            
            
        }

        setEdit(edit => !edit)
             
        
        
    }
    

    return (
        <div className="personal">
            <div className="container">
                <div className="personal__content">
                    <div className="personal__header">
                        Личный кабинет системного администратора
                    </div>
                    <div className="personal__head">
                        <div className="personal__title">
                            Персональные данные
                        </div>
                        <div className="personal__edit" onClick={editPersonal}>
                            Редактировать
                        </div>
                    </div>
                    <div className="personal__data">
                        <PersonalImage edit={edit} fileRef={fileRef} photoUrl={personalData.photoUrl} />
                        <div className="personal__info">
                            <div className="personal__name">
                                <div className="personal__subtitle">ФИО</div>
                                <div className="personal__text">
                                    <input 
                                        type="text" value={personalData.name} disabled={edit}
                                        onChange={e => updatePersonalData({...personalData, name: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="personal__email">
                                <div className="personal__subtitle">Email</div>
                                <div className="personal__text">
                                    <input 
                                        type="text" value={personalData.email} disabled={edit}
                                        onChange={e => updatePersonalData({...personalData, email: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo