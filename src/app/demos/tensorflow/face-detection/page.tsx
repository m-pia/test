'use client';

import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { TRIANGULATION } from './triangulation';

const FaceDetectionPage = () => {
  const [model, setModel] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
        );
        setModel(loadedModel);
        console.log('FaceMesh model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  const setupWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsWebcamActive(true);
          };
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }
  };

  const detectFaces = async () => {
    if (model && videoRef.current && canvasRef.current && isWebcamActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const animate = async () => {
        const predictions = await model.estimateFaces({ input: video });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          predictions.forEach(prediction => {
            const keypoints = prediction.scaledMesh as [number, number, number][];

            for (let i = 0; i < TRIANGULATION.length / 3; i++) {
              const points = [
                TRIANGULATION[i * 3],
                TRIANGULATION[i * 3 + 1],
                TRIANGULATION[i * 3 + 2],
              ].map(index => keypoints[index]);

              ctx.beginPath();
              ctx.moveTo(points[0][0], points[0][1]);
              ctx.lineTo(points[1][0], points[1][1]);
              ctx.lineTo(points[2][0], points[2][1]);
              ctx.closePath();
              ctx.strokeStyle = '#00FFFF';
              ctx.stroke();
            }
          });
        }

        requestAnimationFrame(animate);
      };

      animate();
    }
  };

  useEffect(() => {
    if (isWebcamActive) {
      detectFaces();
    }
  }, [isWebcamActive, model]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Face Detection</h1>
      <p className="text-gray-400 mb-8">Enable your webcam to see real-time face landmark detection using the FaceMesh model.</p>

      <div className="flex flex-col items-center">
        <button onClick={setupWebcam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Start Webcam
        </button>
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline className="max-w-sm rounded-lg shadow-lg" />
          <canvas ref={canvasRef} className="absolute top-0 left-0" />
        </div>
      </div>
    </div>
  );
};

export default FaceDetectionPage;
