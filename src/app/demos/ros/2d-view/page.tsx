'use client';

import { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';

// Define a basic interface for the ROS2D viewer to avoid using 'any'
interface Ros2dViewer {
  scene: {
    scaleX: number;
    scaleY: number;
  }
}

declare global {
  interface Window {
    ROS2D: {
      Viewer: new (options: { divID: string; width: number; height: number; }) => Ros2dViewer;
      OccupancyGridClient: new (options: { ros: ROSLIB.Ros; rootObject: Ros2dViewer['scene']; topic: string; }) => unknown;
    };
  }
}

const Ros2dPage = () => {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [error, setError] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const connectToRos = () => {
    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090',
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      setRos(ros);
    });

    ros.on('error', (error: Error) => {
      console.log('Error connecting to websocket server: ', error);
      setError('Error connecting to websocket server.');
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      setRos(null);
    });
  };

  useEffect(() => {
    if (ros && viewerRef.current && window.ROS2D) {
        viewerRef.current.innerHTML = '';
      const viewer = new window.ROS2D.Viewer({
        divID: viewerRef.current.id,
        width: 800,
        height: 600,
      });

      new window.ROS2D.OccupancyGridClient({
        ros,
        rootObject: viewer.scene,
        topic: '/map',
      });

      viewer.scene.scaleX = 0.1;
      viewer.scene.scaleY = 0.1;
    }
  }, [ros]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">2D View</h1>
      <p className="text-gray-400 mb-8">Display a 2D map from ROS using ros2djs.</p>

      {!ros ? (
        <button onClick={connectToRos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect to ROS
        </button>
      ) : (
        <div>
          <div id="viewer-2d" ref={viewerRef} className="bg-gray-800 rounded-lg shadow-lg"></div>
          <p className="text-center mt-4">Pan: Left-click & drag. Zoom: Middle-click & drag, or scroll.</p>
        </div>
      )}
       {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default Ros2dPage;
