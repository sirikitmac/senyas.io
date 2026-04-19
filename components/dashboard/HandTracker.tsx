'use client';

import { useEffect, useRef } from 'react';

export default function HandTracker({ setDetectedWord }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Script Guard: Don't run until MediaPipe scripts are attached to window
    const checkMediaPipe = () => {
      // @ts-ignore
      return window.Hands && window.Camera && window.drawConnectors && window.drawLandmarks;
    };

    let interval: NodeJS.Timeout;

    const startTracker = () => {
      // @ts-ignore
      const { Hands, HAND_CONNECTIONS, Camera, drawConnectors, drawLandmarks } = window;

      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        const canvasCtx = canvasRef.current?.getContext('2d');
        if (!canvasCtx || !canvasRef.current) return;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw the video frame
        canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#A855F7', lineWidth: 4 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
          }
          const count = results.multiHandLandmarks.length;
          setDetectedWord(count === 2 ? "Two Hands Detected" : "One Hand Detected");
        } else {
          setDetectedWord("No Hand Detected");
        }
        canvasCtx.restore();
      });

      const camera = new Camera(videoRef.current!, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();

      return { camera, hands };
    };

    // Poll to wait for scripts
    if (checkMediaPipe()) {
      const { camera, hands } = startTracker();
      return () => {
        camera.stop();
        hands.close();
      };
    } else {
      interval = setInterval(() => {
        if (checkMediaPipe()) {
          clearInterval(interval);
          const { camera, hands } = startTracker();
          // We need a way to return the cleanup from the interval scope
          // So we attach it to the component state or ref if needed
        }
      }, 500); // Check every 500ms
    }

    return () => clearInterval(interval);
  }, [setDetectedWord]);

  return (
    <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-white/5 bg-black">
      <video ref={videoRef} className="absolute opacity-0 w-px h-px" playsInline autoPlay />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover -scale-x-100" 
        width={1280} 
        height={720} 
      />
    </div>
  );
}