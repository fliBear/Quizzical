import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz() {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
        )
            .then((res) => res.json())
            .then((data) => setQuizData(data.results))
            .catch((err) => console.log(err));
    }, []);

    const questions = quizData.map((questionData) => {
        return (
            <div key={nanoid()} className="question-container">
                <h2>{parseSpecialChars(questionData.question)}</h2>
                {generateAnswers(questionData)}
            </div>
        );
    });

    function generateAnswers(questionData) {
        let arr = randomizeArray([
            ...questionData.incorrect_answers,
            questionData.correct_answer,
        ]);
        return (
            <div>
                {arr.map((ans) => {
                    return (
                        <button key={nanoid()}>{parseSpecialChars(ans)}</button>
                    );
                })}
            </div>
        );
    }

    function randomizeArray(arr) {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function parseSpecialChars(str) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(
            `<!doctype html><body>${str}`,
            "text/html"
        ).body.textContent;
        return decodedString;
    }

    return <div>{questions}</div>;
}

/*
prikazi podatke

*/
