'use client';

import { useState, useEffect } from 'react';
import ROSLIB from 'roslib';

const ParameterViewerPage = () => {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [params, setParams] = useState<string[]>([]);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [paramValue, setParamValue] = useState<any | null>(null);
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const connectToRos = () => {
    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090',
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      setRos(ros);
      getParams(ros);
    });

    ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      setError('Error connecting to websocket server.');
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      setRos(null);
      setParams([]);
    });
  };

  const getParams = (rosInstance: ROSLIB.Ros) => {
    rosInstance.getParams((params) => {
      setParams(params);
    });
  };

  const getParamValue = (paramName: string) => {
    if (!ros) return;
    const param = new ROSLIB.Param({ ros, name: paramName });
    param.get((value) => {
      setParamValue(value);
      setNewValue(JSON.stringify(value));
      setSelectedParam(paramName);
    });
  };

  const setParamValueHandler = () => {
    if (!ros || !selectedParam) return;
    const param = new ROSLIB.Param({ ros, name: selectedParam });
    try {
        param.set(JSON.parse(newValue));
        getParamValue(selectedParam); // Refresh the value
    } catch (e) {
        setError("Invalid JSON format for parameter value.")
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Parameter Viewer</h1>
      <p className="text-gray-400 mb-8">View and modify ROS parameters.</p>

      {!ros ? (
        <button onClick={connectToRos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect to ROS
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Parameters</h2>
            <ul className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto">
              {params.map((param) => (
                <li key={param} onClick={() => getParamValue(param)} className="cursor-pointer p-2 hover:bg-gray-700 rounded">
                  {param}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedParam && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedParam}</h2>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="font-bold">Current Value:</p>
                  <pre>{JSON.stringify(paramValue, null, 2)}</pre>
                </div>
                <div className="mb-4">
                  <label htmlFor="newValue" className="block text-sm font-medium mb-1">New Value (JSON)</label>
                  <textarea
                    id="newValue"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-lg w-full"
                    rows={4}
                  />
                </div>
                <button onClick={setParamValueHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Set Value
                </button>
                {error && <p className="text-red-500 mt-4">Error: {error}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterViewerPage;
