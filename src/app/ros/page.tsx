"use client";

import { useState, useEffect, useRef } from "react";
import ROSLIB from "roslib";

export default function RosPage() {
  const [status, setStatus] = useState("Not connected");
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [topic, setTopic] = useState("/chatter");
  const [message, setMessage] = useState('{"data": "Hello from Next.js!"}');
  const [wsUrl, setWsUrl] = useState("ws://localhost:9090");

  const log = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  const connect = () => {
    if (ros) {
      ros.close();
    }

    log(`Attempting to connect to ${wsUrl}...`);
    const newRos = new ROSLIB.Ros({
      url: wsUrl,
    });

    newRos.on("connection", () => {
      log("Connected to websocket server.");
      setStatus("Connected");
    });

    newRos.on("error", (error) => {
      log(`Error connecting to websocket server: ${error}`);
      setStatus("Error");
    });

    newRos.on("close", () => {
      log("Connection to websocket server closed.");
      setStatus("Not connected");
    });
    
    setRos(newRos);
  };

  const disconnect = () => {
    if (ros) {
      ros.close();
      setRos(null);
    }
  };

  const subscribe = () => {
    if (!ros) {
      log("Error: Not connected to ROS.");
      return;
    }
    
    log(`Subscribing to topic: ${topic}`);
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: topic,
      messageType: "std_msgs/String",
    });

    listener.subscribe((message: any) => {
      log(`Received message on ${listener.name}: ${JSON.stringify(message)}`);
    });
  };

  const publish = () => {
    if (!ros) {
      log("Error: Not connected to ROS.");
      return;
    }

    try {
      const msgJson = JSON.parse(message);
      const pub = new ROSLIB.Topic({
        ros: ros,
        name: topic,
        messageType: "std_msgs/String",
      });

      const rosMessage = new ROSLIB.Message(msgJson);
      pub.publish(rosMessage);
      log(`Published to ${topic}: ${message}`);
    } catch (e: any) {
      log(`Error parsing or publishing message: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">ROS2 + Next.js Demo</h1>
        <p className="mb-6 text-gray-400">
          Connect to a ROS2 WebSocket (like <code className="bg-gray-700 p-1 rounded">ros2-web-bridge</code>) to publish and subscribe to topics.
        </p>

        {/* Connection Section */}
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-300">Connection</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              className="flex-grow bg-gray-800 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="ws://localhost:9090"
            />
            <button
              onClick={connect}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Connect
            </button>
            <button
              onClick={disconnect}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Disconnect
            </button>
          </div>
          <p className="mt-2 text-sm">
            Status: <span className={`font-bold ${status === 'Connected' ? 'text-green-400' : 'text-red-400'}`}>{status}</span>
          </p>
        </div>

        {/* Interaction Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subscribe/Publish Column */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-cyan-300">Topics</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="/chatter"
              />
              <button
                onClick={subscribe}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Subscribe to Topic
              </button>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={3}
                placeholder='{"data": "Hello World"}'
              />
              <button
                onClick={publish}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Publish to Topic
              </button>
            </div>
          </div>

          {/* Log Column */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-cyan-300">Logs</h2>
            <div className="h-64 bg-gray-900 rounded p-2 overflow-y-auto font-mono text-sm">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
