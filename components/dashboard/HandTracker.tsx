'use client';

import { useEffect, useRef } from 'react';

export default function HandTracker({ setDetectedWord }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // @ts-ignore - Accessing globally loaded scripts from layout.tsx
    const { Hands, HAND_CONNECTIONS, Camera, drawConnectors, drawLandmarks } = window;

    if (!videoRef.current || !canvasRef.current || !Hands) {
      console.log("Waiting for MediaPipe scripts...");
      return;
    }

    const hands = new Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2, // DETECTS 2 HANDS NOW!
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results: any) => {
      // 1. DEFINE canvasCtx properly inside the results loop
      const canvasCtx = canvasRef.current!.getContext('2d');
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      
      // Draw the video frame
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

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
      
      // 2. NOW THIS WILL WORK because canvasCtx is defined above!
      canvasCtx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 1280,
      height: 720,
    });
    camera.start();

    return () => {
      camera.stop();
      hands.close();
    };
  }, [setDetectedWord]);

  return (
    <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-white/5 bg-black">
      {/* video is hidden, canvas shows the output */}
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