import { RefObject } from "react"

//  Profile image component. There is a user photo 

interface props {
    edit: boolean | null,
    fileRef: RefObject<HTMLInputElement> | null,
    photoUrl: string | null | undefined
}

const PersonalImage = ({edit, fileRef, photoUrl}: props) => { 
    return (
        <>
            {
                edit ? 
                <div style={{backgroundImage: `url('${photoUrl?.toString()}')`}} className="personal__image">{photoUrl ? "" : <div className="personal__upload">Загрузить фото</div>}</div> :
                <div className="personal__image personal__image_red">
                    <label className="personal__upload"><input ref={fileRef} type="file" />Загрузить фото</label>
                </div>
            }
        </>
    )
}

export default PersonalImage
