'use client';

import { useState, useRef } from 'react';
import ROSLIB from 'roslib';

const ActionCallerPage = () => {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [serverName, setServerName] = useState('/fibonacci');
  const [goalData, setGoalData] = useState('{ "order": 7 }');
  const [feedback, setFeedback] = useState<any | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [status, setStatus] = useState<string>('Not connected');
  const [error, setError] = useState<string | null>(null);
  const goalRef = useRef<ROSLIB.Goal | null>(null);

  const connectToRos = () => {
    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090',
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      setRos(ros);
      setStatus('Connected');
    });

    ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      setError('Error connecting to websocket server.');
      setStatus('Error');
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      setRos(null);
      setStatus('Closed');
    });
  };

  const sendGoal = () => {
    if (!ros) {
      setError('Not connected to ROS.');
      return;
    }

    const actionClient = new ROSLIB.ActionClient({
      ros,
      serverName,
      actionName: 'actionlib_tutorials/FibonacciAction', // This should be dynamic
    });

    try {
      const goal = new ROSLIB.Goal({
        actionClient,
        goalMessage: JSON.parse(goalData),
      });

      goal.on('feedback', (feedback) => {
        setFeedback(feedback);
        setStatus('Receiving feedback');
      });

      goal.on('result', (result) => {
        setResult(result);
        setFeedback(null);
        setStatus('Result received');
        goalRef.current = null;
      });

      goal.on('status', (status) => {
         // You can get more detailed status here if needed.
         console.log("Received status: ", status);
      });

      goal.send();
      goalRef.current = goal;
      setStatus('Goal sent');
      setError(null);
    } catch (e) {
      setError('Invalid JSON format for goal data.');
    }
  };

  const cancelGoal = () => {
    if (goalRef.current) {
      goalRef.current.cancel();
      setStatus('Goal cancelled');
      goalRef.current = null;
    }
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Action Caller</h1>
      <p className="text-gray-400 mb-8">Send a goal to a ROS action server and see the feedback and result.</p>
      <p className="text-yellow-400 mb-8">Current Status: {status}</p>

      {!ros ? (
        <button onClick={connectToRos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect to ROS
        </button>
      ) : (
        <div>
          <div className="mb-4">
            <label htmlFor="serverName" className="block text-sm font-medium mb-1">Action Server Name</label>
            <input
              id="serverName"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="goalData" className="block text-sm font-medium mb-1">Goal Data (JSON)</label>
            <textarea
              id="goalData"
              value={goalData}
              onChange={(e) => setGoalData(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg w-full max-w-md"
              rows={4}
            />
          </div>

          <div className="flex space-x-4">
             <button onClick={sendGoal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
               Send Goal
             </button>
             {goalRef.current && (
                <button onClick={cancelGoal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancel Goal
                </button>
             )}
          </div>

          {error && <p className="text-red-500 mt-4">Error: {error}</p>}

          {feedback && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Feedback</h2>
              <pre className="bg-gray-800 p-4 rounded-lg">{JSON.stringify(feedback, null, 2)}</pre>
            </div>
          )}
          {result && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Result</h2>
              <pre className="bg-gray-800 p-4 rounded-lg">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionCallerPage;
