export default function Blobs(props) {
    return (
        <div>
            <div
                className={`yellow-blob blob-transition ${
                    props.start && "yellow-blob-quiz"
                }`}
            ></div>
            <div
                className={`pink-blob blob-transition ${
                    props.start && "pink-blob-quiz"
                }`}
            ></div>
        </div>
    );
}
