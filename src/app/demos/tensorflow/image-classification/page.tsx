'use client';

import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Image from 'next/image';

const ImageClassificationPage = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [predictions, setPredictions] = useState<{'className': string, 'probability': number}[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const mobilenetModel = await mobilenet.load();
        setModel(mobilenetModel);
        console.log('Model loaded successfully');
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
    }
  };

  const handleClassify = async () => {
    if (model && imageRef.current) {
      try {
        const predictions = await model.classify(imageRef.current);
        setPredictions(predictions);
        console.log('Predictions:', predictions);
      } catch (error) {
        console.error('Error classifying image:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Image Classification</h1>
      <p className="text-gray-400 mb-8">Upload an image to classify it using the MobileNet model.</p>

      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        {imageUrl && (
          <div className="flex flex-col items-center">
            <Image ref={imageRef} src={imageUrl} alt="Uploaded" width={500} height={300} className="max-w-sm rounded-lg shadow-lg" />
            <button onClick={handleClassify} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Classify Image
            </button>
          </div>
        )}
      </div>

      {predictions && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Predictions</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{prediction.className}</span>: {Math.round(prediction.probability * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageClassificationPage;
