import PersonalInfo from "./components/PersonalInfo"
import Head from "./components/Head"
import News from "./components/News"
import Guides from "./components/Guides"
import Control from "./components/Control"
import Structure from "./components/Structure"

function App() {

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
