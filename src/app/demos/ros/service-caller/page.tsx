'use client';

import { useState } from 'react';
import ROSLIB from 'roslib';

const ServiceCallerPage = () => {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [serviceName, setServiceName] = useState('/add_two_ints');
  const [requestData, setRequestData] = useState('{ "a": 1, "b": 2 }');
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const callService = () => {
    if (!ros) {
      setError('Not connected to ROS.');
      return;
    }

    try {
      const request = new ROSLIB.ServiceRequest(JSON.parse(requestData));
      const service = new ROSLIB.Service({
        ros,
        name: serviceName,
        serviceType: 'rospy_tutorials/AddTwoInts', // This should be dynamic
      });

      service.callService(request, (result) => {
        setResponse(result as Record<string, unknown>);
        setError(null);
      }, (error) => {
        setError(error);
        setResponse(null);
      });
    } catch {
      setError('Invalid JSON format for request data.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Service Caller</h1>
      <p className="text-gray-400 mb-8">Call a ROS service and see the response.</p>

      {!ros ? (
        <button onClick={connectToRos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect to ROS
        </button>
      ) : (
        <div>
          <div className="mb-4">
            <label htmlFor="serviceName" className="block text-sm font-medium mb-1">Service Name</label>
            <input
              id="serviceName"
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="requestData" className="block text-sm font-medium mb-1">Request Data (JSON)</label>
            <textarea
              id="requestData"
              value={requestData}
              onChange={(e) => setRequestData(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-md"
              rows={4}
            />
          </div>

          <button onClick={callService} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Call Service
          </button>

          {error && <p className="text-red-500 mt-4">Error: {error}</p>}

          {response && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Response</h2>
              <pre className="bg-gray-800 p-4 rounded-lg">{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCallerPage;
