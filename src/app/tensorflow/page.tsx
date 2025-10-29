"use client";

import { useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function TensorFlowPage() {
  const [inputValue, setInputValue] = useState("5");
  const [prediction, setPrediction] = useState("");
  const [executionMode, setExecutionMode] = useState("client"); // 'client' or 'server'
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async () => {
    const x = parseFloat(inputValue);
    if (isNaN(x)) {
      setPrediction("유효한 숫자를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setPrediction("");

    try {
      if (executionMode === "client") {
        // Client-side prediction
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
        const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
        const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
        await model.fit(xs, ys, { epochs: 250 });
        const result = model.predict(tf.tensor2d([x], [1, 1]));
        if (Array.isArray(result)) {
          setPrediction(`결과: ${result[0].toString()}`);
        } else {
          setPrediction(`결과: ${result.dataSync()[0]}`);
        }
      } else {
        // Server-side prediction
        const response = await fetch("/api/tensorflow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ x }),
        });
        const data = await response.json();
        setPrediction(`결과: ${data.prediction}`);
      }
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction("예측 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TensorFlow.js 선형 회귀 데모</h1>
          <p className="text-gray-600">
            이 데모는 간단한 머신러닝 모델(<code>y = 2x - 1</code>)을 시연합니다. 아래에서 숫자를 입력하고 예측 결과를 확인해보세요.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-6">
          <h2 className="font-bold mb-2">무엇을 시연하나요?</h2>
          <p className="text-sm">이 데모는 TensorFlow.js를 사용하여 웹 애플리케이션의 <strong>프론트엔드(Client-side)</strong>와 <strong>백엔드(Server-side)</strong>에서 머신러닝 모델을 어떻게 실행할 수 있는지 보여줍니다.</p>
          <ul className="list-disc list-inside mt-2 text-sm">
            <li><strong>Client-side:</strong> 모든 계산이 사용자의 웹 브라우저에서 직접 실행됩니다.</li>
            <li><strong>Server-side:</strong> 계산 요청이 백엔드 서버로 전송되어 처리됩니다.</li>
          </ul>
        </div>

        <div className="flex items-center justify-center mb-6">
          <label className="mr-3 font-semibold text-gray-700">실행 모드:</label>
          <div className="flex rounded-lg bg-gray-200 p-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                executionMode === "client"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setExecutionMode("client")}
            >
              Client-side
            </button>
            <button
              className={`ml-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                executionMode === "server"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setExecutionMode("server")}
            >
              Server-side
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-sm">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-2 rounded-l-md px-4 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="'x' 값을 입력하세요 (예: 5)"
            />
            <button
              onClick={handlePrediction}
              disabled={isLoading}
              className="bg-green-500 text-white px-6 py-2 rounded-r-md font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "예측중..." : "예측"}
            </button>
          </div>
          {prediction && 
            <p className="mt-6 text-lg font-semibold bg-gray-100 p-4 rounded-lg shadow-inner">
              <span className="font-mono text-indigo-600">{prediction}</span>
            </p>
          }
        </div>
      </div>
    </div>
  );
}
