'use client';

import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Image from 'next/image';

const ObjectDetectionPage = () => {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[] | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const ssdModel = await cocoSsd.load();
        setModel(ssdModel);
        console.log('COCO-SSD model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      setPredictions(null);
      if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const handleDetect = async () => {
    if (model && imageRef.current) {
      try {
        const predictions = await model.detect(imageRef.current);
        setPredictions(predictions);
        drawBoundingBoxes(predictions);
        console.log('Predictions:', predictions);
      } catch (error) {
        console.error('Error detecting objects:', error);
      }
    }
  };

  const drawBoundingBoxes = (predictions: cocoSsd.DetectedObject[]) => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = imageRef.current.width;
      canvas.height = imageRef.current.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const text = `${prediction.class} - ${Math.round(prediction.score * 100)}%`;

        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = '#00FFFF';
        ctx.font = '18px Arial';
        ctx.fillText(text, x, y > 10 ? y - 5 : 10);
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Object Detection</h1>
      <p className="text-gray-400 mb-8">Upload an image to detect objects using the COCO-SSD model.</p>

      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        {imageUrl && (
          <div className="relative flex flex-col items-center">
            <Image ref={imageRef} src={imageUrl} alt="Uploaded" width={500} height={300} className="max-w-sm rounded-lg shadow-lg" onLoad={() => setPredictions(null)} />
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
            <button onClick={handleDetect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Detect Objects
            </button>
          </div>
        )}
      </div>

      {predictions && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Detected Objects</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{prediction.class}</span>: {Math.round(prediction.score * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ObjectDetectionPage;
