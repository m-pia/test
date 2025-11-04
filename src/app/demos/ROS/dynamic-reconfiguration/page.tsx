'use client';

import { useState, useEffect } from 'react';
import ROSLIB from 'roslib';

const DynamicReconfigurationPage = () => {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [params, setParams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const connectToRos = () => {
    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090',
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      setRos(ros);
      // You would typically fetch the parameters for a specific dynamic reconfigure server
      // For this demo, we'll use a mock parameter
      setParams([
        { name: 'gain', type: 'double', value: 0.5, min: 0, max: 1 },
        { name: 'enabled', type: 'bool', value: true },
      ]);
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

  const handleParamChange = (name: string, value: any) => {
    if (!ros) return;

    const updatedParams = params.map(p => p.name === name ? { ...p, value } : p);
    setParams(updatedParams);

    // This is where you would send the updated parameter to the dynamic reconfigure server
    // For example, using a service call to /<node_name>/set_parameters
    console.log(`Setting parameter ${name} to ${value}`);
    const service = new ROSLIB.Service({
        ros,
        name: '/dynamic_reconfigure_node/set_parameters', // This needs to be the correct service
        serviceType: 'dynamic_reconfigure/Reconfigure' // This needs to be the correct service type
    });

    const request = new ROSLIB.ServiceRequest({
        config: {
            doubles: updatedParams.filter(p => p.type === 'double').map(p => ({ name: p.name, value: p.value })),
            bools: updatedParams.filter(p => p.type === 'bool').map(p => ({ name: p.name, value: p.value }))
        }
    });

    service.callService(request, (result) => {
        console.log("Parameters updated successfully", result);
    }, (error) => {
        console.error("Failed to update parameters", error);
        setError("Failed to update parameters. Check the console for details.");
    });

  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Dynamic Reconfiguration</h1>
      <p className="text-gray-400 mb-8">Dynamically reconfigure ROS node parameters.</p>

      {!ros ? (
        <button onClick={connectToRos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect to ROS
        </button>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Parameters</h2>
          <div className="bg-gray-800 p-4 rounded-lg space-y-4">
            {params.map((param) => (
              <div key={param.name}>
                <label htmlFor={param.name} className="block text-sm font-medium mb-1">{param.name}</label>
                {param.type === 'double' && (
                  <input
                    type="range"
                    id={param.name}
                    min={param.min}
                    max={param.max}
                    step="0.01"
                    value={param.value}
                    onChange={(e) => handleParamChange(param.name, parseFloat(e.target.value))}
                    className="w-full"
                  />
                )}
                {param.type === 'bool' && (
                  <input
                    type="checkbox"
                    id={param.name}
                    checked={param.value}
                    onChange={(e) => handleParamChange(param.name, e.target.checked)}
                  />
                )}
                <span className="ml-2">{param.value.toString()}</span>
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 mt-4">Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default DynamicReconfigurationPage;
