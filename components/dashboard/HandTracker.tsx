'use client';

import { useEffect, useRef } from 'react';
import { FilesetResolver, HandLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";

export default function HandTracker({ setDetectedWord, isVisible, viewMode }: { setDetectedWord: (msg: string) => void, isVisible: boolean, viewMode: 'camera' | 'hands-only' }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;

    const setupMediaPipe = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm"
      );

      handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2,
      });

      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };

    const predict = async () => {
      if (!videoRef.current || !canvasRef.current || !handLandmarkerRef.current) return;
      const canvasCtx = canvasRef.current.getContext('2d');
      if (!canvasCtx) return;

      const results = handLandmarkerRef.current.detectForVideo(videoRef.current, performance.now());

      // DRAWING LOGIC
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // If Camera On: Draw the background video
      if (viewMode === 'camera') {
        canvasCtx.save();
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-canvasRef.current.width, 0);
        canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.restore();
      } else {
        // If Hands Only: Draw solid black
        canvasCtx.fillStyle = 'black';
        canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      // Draw Landmarks
      canvasCtx.save();
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-canvasRef.current.width, 0);
      if (results.landmarks.length > 0) {
        const drawingUtils = new DrawingUtils(canvasCtx);
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: '#A855F7', lineWidth: 4 });
          drawingUtils.drawLandmarks(landmarks, { color: '#FFFFFF', lineWidth: 1, radius: 2 });
        }
        setDetectedWord(results.landmarks.length === 2 ? "Two Hands Detected" : "One Hand Detected");
      } else {
        setDetectedWord("No Hand Detected");
      }
      canvasCtx.restore();
      
      animationFrameId = requestAnimationFrame(predict);
    };

    setupMediaPipe().then(() => {
      videoRef.current?.addEventListener('loadeddata', predict);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      handLandmarkerRef.current?.close();
    };
  }, [isVisible, setDetectedWord, viewMode]);

  return (
    <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-white/5 bg-black">
      <video ref={videoRef} className="absolute opacity-0 w-px h-px" playsInline />
      <canvas ref={canvasRef} className="w-full h-full object-cover" width={1280} height={720} />
    </div>
  );
}