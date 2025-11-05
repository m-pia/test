'use client';

import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';

const QnAPage = () => {
  const [model, setModel] = useState<qna.QuestionAndAnswer | null>(null);
  const [context, setContext] = useState(
    'TensorFlow.js is a library for machine learning in JavaScript. ' +
    'Developers can use it to build and train models in the browser or on Node.js. ' +
    'It provides a low-level API for building models from scratch and a high-level API for using pre-trained models.'
  );
  const [question, setQuestion] = useState('What can developers do with TensorFlow.js?');
  const [answers, setAnswers] = useState<{ text: string; score: number; startIndex: number; endIndex: number; }[] | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const qnaModel = await qna.load();
        setModel(qnaModel);
        console.log('Q&A model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  const handleFindAnswers = async () => {
    if (model && context && question) {
      try {
        const answers = await model.findAnswers(question, context);
        setAnswers(answers);
        console.log('Answers:', answers);
      } catch (error) {
        console.error('Error finding answers:', error);
      }
    }
  };

  const getHighlightedText = () => {
    if (!answers || answers.length === 0) {
      return <p>{context}</p>;
    }

    const answer = answers[0];
    const startIndex = answer.startIndex;
    const endIndex = answer.endIndex;

    return (
      <p>
        {context.substring(0, startIndex)}
        <span className="bg-yellow-500 text-black">{context.substring(startIndex, endIndex)}</span>
        {context.substring(endIndex)}
      </p>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Question & Answer</h1>
      <p className="text-gray-400 mb-8">Ask a question about the context below, and the model will find the answer.</p>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Context</h2>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-lg mb-4"
          rows={6}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-lg mb-4"
        />
      </div>

      <button onClick={handleFindAnswers} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Find Answer
      </button>

      {answers !== null && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Answer</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            {getHighlightedText()}
          </div>
          {answers.length === 0 && <p className="text-yellow-500 mt-2">No answer found.</p>}
        </div>
      )}
    </div>
  );
};

export default QnAPage;
