'use client';

import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';

const SpeechCommandPage = () => {
  const [model, setModel] = useState<speechCommands.SpeechCommandRecognizer | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const recognizer = speechCommands.create('BROWSER_FFT');
        await recognizer.ensureModelLoaded();
        setModel(recognizer);
        console.log('Speech commands model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();

    return () => {
      model?.stopListening();
    };
  }, []);

  const handleListen = () => {
    if (model) {
      if (isListening) {
        model.stopListening();
        setIsListening(false);
      } else {
        setIsListening(true);
        model.listen(result => {
          const scores = Array.from(result.scores as Float32Array);
          const maxScore = Math.max(...scores);
          const index = scores.indexOf(maxScore);
          const command = model.wordLabels()[index];
          setAction(command);
          moveBox(command);
        }, { includeSpectrogram: true, probabilityThreshold: 0.75 });
      }
    }
  };

  const moveBox = (command: string) => {
    setPosition(prevPos => {
      switch (command) {
        case 'up':
          return { ...prevPos, y: prevPos.y - 10 };
        case 'down':
          return { ...prevPos, y: prevPos.y + 10 };
        case 'left':
          return { ...prevPos, x: prevPos.x - 10 };
        case 'right':
          return { ...prevPos, x: prevPos.x + 10 };
        default:
          return prevPos;
      }
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Speech Command Recognition</h1>
      <p className="text-gray-400 mb-8">Click the button and say "up", "down", "left", or "right".</p>

      <button onClick={handleListen} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8 ${isListening ? 'bg-red-500' : ''}`}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      {action && <p className="text-2xl mb-4">Last command: <span className="font-bold text-green-500">{action}</span></p>}

      <div className="relative w-64 h-64 bg-gray-800 rounded-lg overflow-hidden">
        <div
          className="absolute w-10 h-10 bg-green-500 rounded-full transition-transform duration-300"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        ></div>
      </div>
    </div>
  );
};

export default SpeechCommandPage;
