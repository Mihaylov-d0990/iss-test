import PersonalInfo from "./components/PersonalInfo"
import Head from "./components/Head"
import News from "./components/News"
import Guides from "./components/Guides"
import Control from "./components/Control"
import Structure from "./components/Structure"
import React from "react"
import { useTypedSelector } from "./hooks/useTypedSelector"


function App() {

    //  This state is used to enable and disable scroll

    const windowOpen = useTypedSelector(state => state.windowOpen)

    React.useEffect(() => {
        if (windowOpen) document.body.style.overflowY = "hidden"
        else document.body.style.overflowY = "scroll"
    }, [windowOpen])

    return (
        <>  
            <Head />
            <PersonalInfo/>
            <News />
            <Guides />
            <Control />
            <Structure />
        </>
    );
}

export default App;
