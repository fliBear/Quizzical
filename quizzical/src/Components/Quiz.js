import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz() {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
        )
            .then((res) => res.json())
            .then((data) => {
                const allQuizData = data.results.map((data) => {
                    return {
                        question: data.question,
                        correct_answer: data.correct_answer,
                        all_answers: generateAllAnswersArr([
                            ...data.incorrect_answers,
                            data.correct_answer,
                        ]),
                        id: nanoid(),
                    };
                });
                setQuizData(allQuizData);
            })
            .catch((err) => console.log(err));
    }, []);

    function generateAllAnswersArr(arr) {
        return randomizeArray(
            arr.map((el) => {
                return { value: el, selected: false };
            })
        );
    }

    const questions = quizData.map((questionData) => {
        return (
            <div
                key={questionData.id}
                className="question-container question-text"
            >
                <h3>{parseSpecialChars(questionData.question)}</h3>
                {generateAnswers(questionData.all_answers, questionData.id)}
            </div>
        );
    });

    function generateAnswers(arr, questionId) {
        return (
            <div>
                {arr.map((ans) => {
                    return (
                        <button
                            key={nanoid()}
                            className={`btn ans-btn ${
                                ans.selected ? "ans-selected" : ""
                            }`}
                            onClick={() => chooseAnswer(ans, questionId)}
                        >
                            {parseSpecialChars(ans.value)}
                        </button>
                    );
                })}
            </div>
        );
    }

    function chooseAnswer(answer, questionId) {
        setQuizData((oldData) => {
            return oldData.map((data) => {
                return data.id === questionId
                    ? {
                          ...data,
                          all_answers: data.all_answers.map((oldAns) => {
                              return oldAns.value === answer.value
                                  ? {
                                        ...oldAns,
                                        selected: !oldAns.selected,
                                    }
                                  : { ...oldAns };
                          }),
                      }
                    : { ...data };
            });
        });
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

    return (
        <div className="flex flex-column">
            {questions}
            <button className="btn action-btn">Check answers</button>
        </div>
    );
}
