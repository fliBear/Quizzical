import { useState } from "react";
import "./Styles/styles.css";
import Blobs from "./Components/Blobs";
import StartScreen from "./Components/StartScreen";

function App() {
    const [start, setStart] = useState(false);

    return (
        <div>
            <Blobs start={start}></Blobs>
            <main>
                {start ? (
                    <div></div>
                ) : (
                    <StartScreen setStart={setStart}></StartScreen>
                )}
            </main>
        </div>
    );
}

export default App;
