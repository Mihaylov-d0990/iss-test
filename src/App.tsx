import PersonalData from "./PersonalData"
import Head from "./Head"
import News from "./News"
import Guide from "./Guide";


function App() {
    fetch('http://localhost:8080/api/login?username=test@mail.com&password=test', {
        method: "POST"
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        console.log(data);
        
    })

    fetch("http://localhost:8080/api/v1/user?id=00000000-0000-0000-0005-000000000001")
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {
        console.log(data);
        
    })

    return (
        <>  
            <Head />
            <PersonalData />
            <News />
            <Guide />
        </>
    );
}

export default App;
