export default function StartScreen(props) {
    return (
        <div className="container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Click Start quiz to get graded.</p>
            <button
                className="btn action-btn"
                onClick={() => props.setStart(true)}
            >
                Start quiz
            </button>
        </div>
    );
}
