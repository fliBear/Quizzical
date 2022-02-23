import { useState } from "react";
import "./Styles/styles.css";
import Blobs from "./Components/Blobs";
import StartScreen from "./Components/StartScreen";
import Quiz from "./Components/Quiz";

function App() {
    const [start, setStart] = useState(false);

    return (
        <div>
            <Blobs start={start}></Blobs>
            <main>
                {start ? (
                    <Quiz></Quiz>
                ) : (
                    <StartScreen setStart={setStart}></StartScreen>
                )}
            </main>
        </div>
    );
}

export default App;
