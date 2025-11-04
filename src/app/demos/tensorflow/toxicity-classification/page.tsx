'use client';

import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';

const ToxicityClassificationPage = () => {
  const [model, setModel] = useState<toxicity.ToxicityClassifier | null>(null);
  const [sentence, setSentence] = useState('You are a wonderful person');
  const [predictions, setPredictions] = useState<toxicity.ToxicityPrediction[] | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const toxicityModel = await toxicity.load(0.9);
        setModel(toxicityModel);
        console.log('Toxicity model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  const handleAnalyze = async () => {
    if (model && sentence) {
      try {
        const predictions = await model.classify([sentence]);
        setPredictions(predictions);
        console.log('Predictions:', predictions);
      } catch (error) {
        console.error('Error classifying sentence:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Toxicity Classification</h1>
      <p className="text-gray-400 mb-8">Enter a sentence to analyze its toxicity using the Toxicity model.</p>

      <div className="flex flex-col items-center">
        <textarea
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-md mb-4"
          rows={4}
        />
        <button onClick={handleAnalyze} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Analyze
        </button>
      </div>

      {predictions && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <ul>
            {predictions.map((prediction) => (
              <li key={prediction.label} className="mb-2">
                <span className="font-bold">{prediction.label}</span>:
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${prediction.results[0].match ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.round(prediction.results[0].probabilities[1] * 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm">{Math.round(prediction.results[0].probabilities[1] * 100)}% chance of being toxic</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToxicityClassificationPage;
