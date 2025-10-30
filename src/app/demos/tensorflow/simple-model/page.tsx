'use client';

import { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function TensorFlowSimpleModelPage() {
  const [inputValue, setInputValue] = useState('5');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async () => {
    const x = parseFloat(inputValue);
    if (isNaN(x)) {
      setPrediction('유효한 숫자를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setPrediction('');

    try {
      // Client-side prediction
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
      const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
      const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
      await model.fit(xs, ys, { epochs: 250 });
      const result = model.predict(tf.tensor2d([x], [1, 1]));
      if (Array.isArray(result)) {
        setPrediction(`결과: ${result[0].toString()}`);
      } else {
        setPrediction(`결과: ${result.dataSync()[0]}`);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
      setPrediction('예측 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">TensorFlow.js 선형 회귀 데모</h1>
        <p className="text-gray-400">
          이 데모는 간단한 머신러닝 모델(<code>y = 2x - 1</code>)을 시연합니다. 아래에서 숫자를 입력하고 예측 결과를 확인해보세요.
        </p>
      </div>

      <div className="bg-gray-700 border-l-4 border-blue-500 text-blue-300 p-4 rounded-md mb-6">
        <h2 className="font-bold mb-2">무엇을 시연하나요?</h2>
        <p className="text-sm">이 데모는 TensorFlow.js를 사용하여 웹 애플리케이션의 <strong>프론트엔드(Client-side)</strong>에서 머신러닝 모델을 어떻게 실행할 수 있는지 보여줍니다.</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-sm">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-2 border-gray-600 bg-gray-800 rounded-l-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="'x' 값을 입력하세요 (예: 5)"
          />
          <button
            onClick={handlePrediction}
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-2 rounded-r-md font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? '예측중...' : '예측'}
          </button>
        </div>
        {prediction && 
          <p className="mt-6 text-lg font-semibold bg-gray-700 p-4 rounded-lg shadow-inner">
            <span className="font-mono text-indigo-400">{prediction}</span>
          </p>
        }
      </div>
    </div>
  );
}
