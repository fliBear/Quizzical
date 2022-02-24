import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz() {
    const [quizData, setQuizData] = useState([]);
    const [quizState, setQuizState] = useState({
        finished: false,
        correct: 0,
    });

    useEffect(() => {
        fetchAndSetData();
    }, []);

    function fetchAndSetData() {
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
    }

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
                {generateAnswers(
                    questionData.all_answers,
                    questionData.id,
                    questionData.correct_answer
                )}
            </div>
        );
    });

    function generateAnswers(arr, questionId, correct) {
        return (
            <div>
                {arr.map((ans) => {
                    return (
                        <button
                            key={nanoid()}
                            className={`btn ans-btn ${
                                ans.selected ? "ans-selected" : ""
                            } ${
                                quizState.finished && ans.value === correct
                                    ? "ans-correct"
                                    : ""
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
                                  : { ...oldAns, selected: false };
                          }),
                      }
                    : { ...data };
            });
        });
    }

    function finishQuiz() {
        if (quizState.finished) {
            setQuizState({ finished: false, correct: 0 });
            fetchAndSetData();
        } else {
            setQuizState((oldState) => {
                return {
                    finished: true,
                    correct: quizData.filter((question) => {
                        const ansCorrect = question.all_answers.some((ans) => {
                            return (
                                ans.value === question.correct_answer &&
                                ans.selected
                            );
                        });
                        return ansCorrect;
                    }).length,
                };
            });
        }
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
            <div className="result">
                {quizState.finished && (
                    <span className="result-txt">
                        You scored {quizState.correct} / {quizData.length}{" "}
                        correct answers
                    </span>
                )}
                <button className="btn action-btn" onClick={finishQuiz}>
                    {quizState.finished ? "Play again" : "Check answers"}
                </button>
            </div>
        </div>
    );
}
