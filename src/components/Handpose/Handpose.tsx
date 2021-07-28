import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { HandPose, load as loadModel } from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';

import { drawHand } from './utils';
import './Handpose.css';

const Handpose = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    tf.getBackend();
    const net = await loadModel();

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net: HandPose) => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4 ||
      !canvasRef.current
    ) {
      return;
    }
    const { video } = webcamRef.current;
    const { videoWidth, videoHeight } = video;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // detect hand pose
    const hand = await net.estimateHands(video);

    // draw hand
    const ctx = canvasRef.current.getContext('2d');
    drawHand(hand, ctx!);
  };

  return (
    <div className="Handpose-container">
      <Webcam ref={webcamRef} className="Handpose-video" />
      <canvas ref={canvasRef} className="Handpose-video" />
    </div>
  );
};

export default Handpose;
