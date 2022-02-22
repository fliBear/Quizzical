import "./Styles/styles.css";

function App() {
    return (
        <div className="container">
            <div className="yellow-blob"></div>
            <div className="pink-blob"></div>
            <main>
                <h1 className="title">Quizzical</h1>
                <p className="description">Click Start quiz to get graded.</p>
                <button className="btn action-btn">Start quiz</button>
            </main>
        </div>
    );
}

export default App;
