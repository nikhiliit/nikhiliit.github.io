import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';

// Sample skeleton data (17 keypoints in COCO format)
const sampleSkeletons = [
  // Walking pose 1
  [
    [90, 50], [90, 100], [70, 125], [60, 175], [50, 225], // Head, neck, left shoulder, left elbow, left wrist
    [110, 125], [120, 175], [130, 225], // Right shoulder, right elbow, right wrist
    [90, 150], // Hip center
    [70, 200], [60, 250], [50, 300], // Left hip, left knee, left ankle
    [110, 200], [120, 250], [130, 300], // Right hip, right knee, right ankle
    [80, 40], [100, 40] // Left eye, right eye
  ],
  // Walking pose 2
  [
    [90, 50], [90, 100], [70, 125], [50, 160], [60, 200], // Head, neck, left shoulder, left elbow, left wrist
    [110, 125], [130, 160], [120, 200], // Right shoulder, right elbow, right wrist
    [90, 150], // Hip center
    [70, 200], [50, 250], [70, 300], // Left hip, left knee, left ankle
    [110, 200], [130, 250], [110, 300], // Right hip, right knee, right ankle
    [80, 40], [100, 40] // Left eye, right eye
  ],
  // Walking pose 3
  [
    [90, 50], [90, 100], [70, 125], [80, 170], [90, 210], // Head, neck, left shoulder, left elbow, left wrist
    [110, 125], [100, 170], [90, 210], // Right shoulder, right elbow, right wrist
    [90, 150], // Hip center
    [70, 200], [80, 250], [90, 300], // Left hip, left knee, left ankle
    [110, 200], [100, 250], [90, 300], // Right hip, right knee, right ankle
    [80, 40], [100, 40] // Left eye, right eye
  ]
];

// Define the skeleton connections
const skeletonConnections = [
  [0, 1], // Head to neck
  [1, 2], [2, 3], [3, 4], // Left arm
  [1, 5], [5, 6], [6, 7], // Right arm
  [1, 8], // Neck to hip center
  [8, 9], [9, 10], [10, 11], // Left leg
  [8, 12], [12, 13], [13, 14], // Right leg
  [0, 15], [0, 16], [15, 16] // Eyes and connection between eyes
];

const SkeletonVisualizer = () => {
  const [skeletonIndex, setSkeletonIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Function to animate through the skeletons
  useEffect(() => {
    let animationTimer;
    
    if (isAnimating) {
      animationTimer = setInterval(() => {
        setSkeletonIndex(prevIndex => (prevIndex + 1) % sampleSkeletons.length);
      }, 500);
    }
    
    return () => {
      if (animationTimer) clearInterval(animationTimer);
    };
  }, [isAnimating]);
  
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };
  
  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-lg p-6 mb-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Skeleton Visualization Demo</h2>
        <div className="space-x-2">
          <button 
            onClick={toggleAnimation} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
          <button 
            onClick={handleZoomIn} 
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            <i className="fas fa-search-plus"></i>
          </button>
          <button 
            onClick={handleZoomOut} 
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            <i className="fas fa-search-minus"></i>
          </button>
        </div>
      </div>
      
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <Stage width={400} height={350} scaleX={scale} scaleY={scale}>
          <Layer>
            {/* Draw the connections */}
            {skeletonConnections.map((connection, i) => {
              const startPoint = sampleSkeletons[skeletonIndex][connection[0]];
              const endPoint = sampleSkeletons[skeletonIndex][connection[1]];
              
              return (
                <Line
                  key={`connection-${i}`}
                  points={[startPoint[0], startPoint[1], endPoint[0], endPoint[1]]}
                  stroke="#4831D4"
                  strokeWidth={4}
                  lineCap="round"
                  lineJoin="round"
                />
              );
            })}
            
            {/* Draw the keypoints */}
            {sampleSkeletons[skeletonIndex].map((point, i) => (
              <Circle
                key={`keypoint-${i}`}
                x={point[0]}
                y={point[1]}
                radius={5}
                fill="#6045FF"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            ))}
            
            {/* Add some labels */}
            <Text
              text="Human Pose Skeleton"
              x={135}
              y={20}
              fontSize={16}
              fontStyle="bold"
              fill="#333333"
            />
          </Layer>
        </Stage>
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-700">
          This demo visualizes human pose skeletons generated using my research on skeleton frame generation. 
          Toggle the animation to see different poses. This technology is part of my work on 
          <strong> "SSDL: Sensor-to-Skeleton Diffusion Model with Lipschitz Regularization"</strong>.
        </p>
      </div>
    </div>
  );
};

export default SkeletonVisualizer;