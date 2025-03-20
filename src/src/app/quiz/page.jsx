"use client";

import * as React from 'react';
import ShieldLogo from '../../components/shieldlogo';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from '@/components/ui/card';

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

  const fetchQuestions = React.useCallback(async () => {
    try 
    {
      setLoading(true);
      
      let retries = 3; 
      let delay = 1000; 
      let response, data;

      for (let i = 0; i < retries; i++) 
        {
        response = await fetch('/api/OpenAI/quiz', {
          method: 'POST',
          body: JSON.stringify({ prompt: "generate quiz" }), 
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) 
        {
          data = await response.json();
          break; 
        } 
        else if (response.status === 429) 
        {
          await new Promise(resolve => setTimeout(resolve, delay));
        } 
      }

      setQuestions(data.questions);


      setEmailOrder((data.questions).map(() => Math.random() < 0.5));
      
    } 
    catch (error) 
    {
      console.error('Failed to fetch quiz questions:', error);
    } 
    finally 
    {
      setLoading(false);
    }
  }, []);


  React.useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

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
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedEmail(null);
      setAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedEmail(null);
    setAnswered(false);
    setEmailOrder([]);
    fetchQuestions();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <ShieldLogo />
        <h1 className="text-2xl font-bold mt-4">Loading Quiz...</h1>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <ShieldLogo />
        <h1 className="text-2xl font-bold mt-4">Error Loading Quiz</h1>
        <p className="text-gray-600 mt-2">Unable to load quiz questions. Please try again later.</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isPhishingFirst = emailOrder[currentQuestion];

  const firstEmail = isPhishingFirst ? currentQ.fake_email : currentQ.real_email;
  const firstSubject = isPhishingFirst ? currentQ.fake_subject : currentQ.real_subject;
  const firstMessage = isPhishingFirst ? currentQ.fake_message : currentQ.real_message;
  
  const secondEmail = isPhishingFirst ? currentQ.real_email : currentQ.fake_email;
  const secondSubject = isPhishingFirst ? currentQ.real_subject : currentQ.fake_subject;
  const secondMessage = isPhishingFirst ? currentQ.real_message : currentQ.fake_message;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Phishing Email Quiz</h1>
          <p className="text-gray-600 mt-2">Test your ability to identify phishing emails</p>
        </div>

        {!quizComplete ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <span className="text-md">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-md">Score: {score}/{currentQuestion + (answered ? 1 : 0)}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + (answered ? 1 : 0)) / questions.length) * 100}%` }}></div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  <span className="font-bold">Challenge</span>
                </div>
                <p>One of these emails is a phishing attempt. Can you identify which one?</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !answered && selectedEmail === firstEmail ? 'ring-2 ring-blue-500' : 
                  answered && selectedEmail === firstEmail && firstEmail === currentQ.fake_email ? 'ring-2 ring-green-500' :
                  answered && selectedEmail === firstEmail && firstEmail !== currentQ.fake_email ? 'ring-2 ring-red-500' :
                  answered && firstEmail === currentQ.fake_email && selectedEmail !== firstEmail ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => handleEmailSelection(firstEmail)}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="font-medium">From: {firstEmail}</p>
                    <p className="text-gray-600">Subject: {firstSubject}</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="whitespace-pre-line">
                      {firstMessage}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t text-center">
                    <span className="font-medium">Email 1</span>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !answered && selectedEmail === secondEmail ? 'ring-2 ring-blue-500' : 
                  answered && selectedEmail === secondEmail && secondEmail === currentQ.fake_email ? 'ring-2 ring-green-500' :
                  answered && selectedEmail === secondEmail && secondEmail !== currentQ.fake_email ? 'ring-2 ring-red-500' :
                  answered && secondEmail === currentQ.fake_email && selectedEmail !== secondEmail ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => handleEmailSelection(secondEmail)}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="font-medium">From: {secondEmail}</p>
                    <p className="text-gray-600">Subject: {secondSubject}</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="whitespace-pre-line">
                      {secondMessage}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t text-center">
                    <span className="font-medium">Email 2</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {answered && (
              <div className="mb-6">
                {isCorrect ? (
                  <div className="flex items-center p-4 bg-green-100 border border-green-400 rounded">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Correct! This is a phishing email. Red flags include: the sender domain '{currentQ.fake_email.split('@')[1]}' (not an official domain), creating urgency with a threat, and requesting you to click a suspicious link.</span>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-red-100 border border-red-400 rounded">
                    <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Incorrect! The phishing attempt is from '{currentQ.fake_email}'. Red flags include: unofficial domain name, creating urgency, and requesting you to click a suspicious link.</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between">
              {!answered ? (
                <Button 
                  className="w-full max-w-xs"
                  onClick={handleSubmitAnswer}
                  disabled={selectedEmail === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="flex justify-end w-full">
                  <Button 
                    className="px-6"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Card className="w-full">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-6">Your final score: {score}/{questions.length}</p>
              <div className="mb-8">
                {score === questions.length ? (
                  <p className="text-green-600">Perfect score! You're an expert at spotting phishing emails.</p>
                ) : score >= questions.length * 0.8 ? (
                  <p className="text-green-600">Great job! You're well-equipped to identify most phishing attempts.</p>
                ) : score >= questions.length * 0.6 ? (
                  <p className="text-amber-600">Good effort! With a bit more practice, you'll be a phishing expert.</p>
                ) : (
                  <p className="text-red-600">You might benefit from learning more about spotting phishing emails.</p>
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