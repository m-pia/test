'use client';

import { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';
import * as THREE from 'three';
import { Viewer, UrdfClient } from 'ros3d';

const Ros3dPage = () => {
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

    ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      setError('Error connecting to websocket server.');
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      setRos(null);
    });
  };

  useEffect(() => {
    if (ros && viewerRef.current) {
        viewerRef.current.innerHTML = '';

      const viewer = new Viewer({
        divID: viewerRef.current.id,
        width: 800,
        height: 600,
        antialias: true,
        background: '#1a202c'
      });

      // Add a grid.
      viewer.addObject(new THREE.GridHelper(10, 10));

      // Setup a client to listen to TFs.
      const tfClient = new ROSLIB.TFClient({
        ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: '/base_link'
      });

      // Setup the URDF client.
      const urdfClient = new UrdfClient({
        ros,
        tfClient,
        path: 'http://localhost:8000/pr2.urdf', // This needs to be a path to a valid URDF file
        rootObject: viewer.scene,
        loader: (path, onComplete) => {
            // A custom loader can be used here if needed
            const loader = new THREE.FileLoader();
            loader.load(path, (data) => {
                onComplete(new DOMParser().parseFromString(data as string, 'text/xml'));
            });
        }
      });

    }
  }, [ros]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">3D View</h1>
      <p className="text-gray-400 mb-8">Display a 3D robot model from ROS using ros3djs.</p>

      {!ros ? (
        <button onClick={connectToRos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect to ROS
        </button>
      ) : (
        <div>
            <div id="viewer-3d" ref={viewerRef} className="bg-gray-800 rounded-lg shadow-lg"></div>
            <p className="text-center mt-4">Rotate: Left-click & drag. Pan: Right-click & drag. Zoom: Middle-click & drag, or scroll.</p>
        </div>

      )}
       {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default Ros3dPage;
