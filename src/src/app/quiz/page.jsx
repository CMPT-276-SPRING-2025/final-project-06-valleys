"use client";

import * as React from "react";
import ShieldLogo from "../../components/shieldlogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmailQuiz() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [quizComplete, setQuizComplete] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const [answered, setAnswered] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [emailOrder, setEmailOrder] = React.useState([]);

  const fetchQuestion = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/OpenAI/quiz", {
        method: "POST",
        body: JSON.stringify({ prompt: "generate quiz" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const question = data.questions[0];

        setQuestions((prev) => [...prev, question]);
        setEmailOrder((prev) => [...prev, Math.random() < 0.5]);
      } else {
        console.error("Failed to fetch question");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleEmailSelection = (email) => {
    if (!answered) {
      setSelectedEmail(email);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedEmail === null) return;

    const currentQ = questions[currentQuestion];
    const correct = selectedEmail === currentQ.fake_email;

    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= 4) {
      setQuizComplete(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedEmail(null);
      setAnswered(false);
      fetchQuestion();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedEmail(null);
    setAnswered(false);
    setQuestions([]);
    setEmailOrder([]);
    fetchQuestion();
  };

  if (loading && questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <ShieldLogo />
        <h1 className="mt-4 text-2xl font-bold">Loading Quiz...</h1>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <ShieldLogo />
        <h1 className="mt-4 text-2xl font-bold">Error Loading Quiz</h1>
        <p className="mt-2 text-gray-600">
          Unable to load quiz questions. Please try again later.
        </p>
      </div>
    );
  }

  if (!questions[currentQuestion]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <ShieldLogo />
        <h1 className="mt-4 text-2xl font-bold">Loading next question...</h1>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isPhishingFirst = emailOrder[currentQuestion];

  const firstEmail = isPhishingFirst
    ? currentQ.fake_email
    : currentQ.real_email;
  const firstSubject = isPhishingFirst
    ? currentQ.fake_subject
    : currentQ.real_subject;
  const firstMessage = isPhishingFirst
    ? currentQ.fake_message
    : currentQ.real_message;

  const secondEmail = isPhishingFirst
    ? currentQ.real_email
    : currentQ.fake_email;
  const secondSubject = isPhishingFirst
    ? currentQ.real_subject
    : currentQ.fake_subject;
  const secondMessage = isPhishingFirst
    ? currentQ.real_message
    : currentQ.fake_message;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <ShieldLogo />
          </div>
          <h1 className="text-3xl font-bold">Phishing Email Quiz</h1>
          <p className="mt-2 text-gray-600">
            Test your ability to identify phishing emails
          </p>
        </div>

        {!quizComplete ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-md">
                Question {currentQuestion + 1} of 5
              </span>
              <span className="text-md">
                Score: {score}/{currentQuestion + (answered ? 1 : 0)}
              </span>
            </div>

            <div className="mb-6 h-2.5 w-full rounded-full bg-gray-200">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{
                  width: `${((currentQuestion + (answered ? 1 : 0)) / 5) * 100}%`,
                }}
              ></div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  <span className="font-bold">Challenge</span>
                </div>
                <p>
                  One of these emails is a phishing attempt. Can you identify
                  which one?
                </p>
              </CardContent>
            </Card>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  email: firstEmail,
                  subject: firstSubject,
                  message: firstMessage,
                  label: "Email 1",
                },
                {
                  email: secondEmail,
                  subject: secondSubject,
                  message: secondMessage,
                  label: "Email 2",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !answered && selectedEmail === item.email
                      ? "ring-2 ring-blue-500"
                      : answered &&
                          selectedEmail === item.email &&
                          item.email === currentQ.fake_email
                        ? "ring-2 ring-green-500"
                        : answered &&
                            selectedEmail === item.email &&
                            item.email !== currentQ.fake_email
                          ? "ring-2 ring-red-500"
                          : answered &&
                              item.email === currentQ.fake_email &&
                              selectedEmail !== item.email
                            ? "ring-2 ring-green-500"
                            : ""
                  }`}
                  onClick={() => handleEmailSelection(item.email)}
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <p className="font-medium">From: {item.email}</p>
                      <p className="text-gray-600">Subject: {item.subject}</p>
                    </div>
                    <div className="border-t pt-4 whitespace-pre-line">
                      {item.message}
                    </div>
                    <div className="mt-6 border-t pt-4 text-center font-medium">
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {answered && (
              <div className="mb-6">
                {isCorrect ? (
                  <div className="flex items-center rounded border border-green-400 bg-green-100 p-4">
                    <svg
                      className="mr-2 h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>
                      Correct! This is a phishing email. Red flags include: the
                      sender domain '{currentQ.fake_email.split("@")[1]}' (not
                      an official domain), creating urgency with a threat, and
                      requesting you to click a suspicious link.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center rounded border border-red-400 bg-red-100 p-4">
                    <svg
                      className="mr-2 h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    <span>
                      Incorrect! The phishing attempt is from '
                      {currentQ.fake_email}'. Red flags include: unofficial
                      domain name, creating urgency, and requesting you to click
                      a suspicious link.
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              {!answered ? (
                <Button
                  className="w-full max-w-xs"
                  onClick={handleSubmitAnswer}
                  disabled={selectedEmail === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>Next Question</Button>
              )}
            </div>
          </>
        ) : (
          <Card className="w-full">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Quiz Complete!</h2>
              <p className="mb-6 text-xl">Your final score: {score}/5</p>
              <div className="mb-8">
                {score === 5 ? (
                  <p className="text-green-600">
                    Perfect score! You're an expert at spotting phishing emails.
                  </p>
                ) : score >= 4 ? (
                  <p className="text-green-600">
                    Great job! You're well-equipped to identify most phishing
                    attempts.
                  </p>
                ) : score >= 3 ? (
                  <p className="text-amber-600">
                    Good effort! With a bit more practice, you'll be a phishing
                    expert.
                  </p>
                ) : (
                  <p className="text-red-600">
                    You might benefit from learning more about spotting phishing
                    emails.
                  </p>
                )}
              </div>
              <Button onClick={handleRestartQuiz}>Try Again</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
