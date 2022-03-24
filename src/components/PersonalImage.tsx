import { RefObject } from "react"

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
                <div style={{backgroundImage: `url('${photoUrl?.toString()}')`}} className="personal__image"></div> :
                <div className="personal__image"><label className="personal__upload"><input ref={fileRef} type="file" />Загрузить фото</label></div>
            }
        </>
    )
}

export default PersonalImage
